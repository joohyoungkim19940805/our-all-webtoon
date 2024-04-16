package com.our.all.webtoon.web.handler;

import static com.our.all.webtoon.util.ResponseWrapper.response;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.reactive.function.server.ServerResponse.BodyBuilder;
import com.our.all.webtoon.config.security.JwtIssuerType;
import com.our.all.webtoon.config.security.JwtVerifyHandler;
import com.our.all.webtoon.entity.account.AccountEntity;
import com.our.all.webtoon.repository.account.AccountRepository;
import com.our.all.webtoon.service.AccountService;
import com.our.all.webtoon.service.MailService;
import com.our.all.webtoon.util.ResponseWrapper;
import com.our.all.webtoon.util.exception.AccountException;
import com.our.all.webtoon.util.exception.ApiException;
import com.our.all.webtoon.util.exception.BirdPlusException.Result;
import com.our.all.webtoon.util.exception.ForgotPasswordException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwsHeader;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Component
public class IndexHandler {

  @Autowired
  private AccountService accountService;

  @Autowired
  private MailService mailService;

  @Autowired
  private AccountRepository accountRepository;

  @Autowired
  private JwtVerifyHandler jwtVerifyHandler;

  public Mono<ServerResponse> test(ServerRequest request) {
    return ok().contentType(MediaType.TEXT_HTML).render("/test.html");
  }

  public Mono<ServerResponse> index(ServerRequest request) {
    return ok().contentType(MediaType.TEXT_HTML).render("/index.html");
  }

  public Mono<ServerResponse> loginPage(ServerRequest request) {
    return ok().contentType(MediaType.parseMediaType("text/html;charset=UTF-8"))
        .render("content/loginPage.html", Map.of("resourcesNameList", List.of("loginPage")));
  }

  public Mono<ServerResponse> create(ServerRequest request) {
    /*
     * return ok() .contentType(MediaType.APPLICATION_JSON)
     * .body(accountService.createUser(request.bodyToMono(AccountEntity.class)) .map(e ->
     * response(Result._0, e)), Response.class ) .onErrorResume(e -> Mono.error(new
     * UnauthorizedException(Result._110)));
     */
    return accountService.createUser(request.bodyToMono(AccountEntity.class))
        .flatMap(account -> ok().contentType(MediaType.APPLICATION_JSON).body(response(Result._0),
            ResponseWrapper.class));

  }

  public Mono<ServerResponse> accountVerifyPage(ServerRequest request) {
    BodyBuilder body = ok().contentType(MediaType.parseMediaType("text/html;charset=UTF-8"));
    String returnHtml = "content/account/accountVerify.html";
    String token = request.pathVariable("token").replace("bearer-", "");
    return Mono.just(request.queryParam("email")).flatMap(emial -> {
      Jws<Claims> jws = jwtVerifyHandler.getJwt(token);
      Claims claims = jws.getPayload();
      JwsHeader header = jws.getHeader();
      Date expiration = claims.getExpiration();

      if (!JwtIssuerType.ACCOUNT_VERIFY.name().equals(String.valueOf(header.get("jwtIssuerType")))
          || expiration.before(new Date())) {
        return body.render(returnHtml);
      }

      return body.render(returnHtml, Map.of("email", claims.getSubject(), "token", token));
    })
    // .onErrorResume(e->Mono.error(new UnauthorizedException(Result._104)))
    ;
  }

  protected record AccountVerifyRequest(String email) {
  }

  public Mono<ServerResponse> accountVerify(ServerRequest request) {
    // BodyInserters
    return request.bodyToMono(AccountVerifyRequest.class).flatMap(accountVerifyRequest -> {
      return accountRepository.findByEmail(accountVerifyRequest.email())
          .switchIfEmpty(Mono.error(new ApiException(Result._1))).map(accountEntity -> {
            accountEntity.setIsEnabled(true);
            return accountEntity;
          });
    }).flatMap(accountEntity -> accountRepository.save(accountEntity))
        .switchIfEmpty(Mono.error(new ForgotPasswordException(Result._108)))
        .flatMap(e -> ok().contentType(MediaType.APPLICATION_JSON).body(response(Result._0),
            ResponseWrapper.class));
    /*
     * return Mono.just(request.queryParam("email")) .flatMap(emial -> { String token =
     * request.pathVariable("token").replace("bearer-", "");
     * 
     * Jws<Claims> jws = jwtVerifyHandler.getJwt(token); Claims claims = jws.getBody(); JwsHeader<?>
     * header = jws.getHeader(); Date expiration = claims.getExpiration();
     * 
     * if( ! JwtIssuerType.ACCOUNT_VERIFY.name().equals( String.valueOf(header.get("jwtIssuerType"))
     * )) { return ok() .contentType(MediaType.parseMediaType("text/html;charset=UTF-8"))
     * .render("content/account/accountVerifyTemplate.html"); }else if(expiration.before(new
     * Date())) { return ok() .contentType(MediaType.parseMediaType("text/html;charset=UTF-8"))
     * .render("content/account/accountVerifyTemplate.html"); }
     * 
     * return ok() .contentType(MediaType.parseMediaType("text/html;charset=UTF-8"))
     * .render("content/account/accountVerifyTemplate.html", Map.of( "email", claims.getSubject(),
     * "token", token )); }) .onErrorResume(e->{ return Mono.error(new
     * UnauthorizedException(Result._104)); });
     */
  }

  public Mono<ServerResponse> loginProcessing(ServerRequest request) {
    return accountService
        .authenticate(request.bodyToMono(AccountEntity.class), request.remoteAddress())
        .flatMap(token -> ok()
            .cookie(ResponseCookie.fromClientResponse(HttpHeaders.AUTHORIZATION, token.getToken())
                .httpOnly(false).sameSite("Strict").path("/").build())
            .contentType(MediaType.APPLICATION_JSON)
            .body(response(Result._0, token), ResponseWrapper.class));
    /*
     * ok() .contentType(MediaType.APPLICATION_JSON)
     * .body(accountService.authenticate(request.bodyToMono(AccountEntity.class),
     * request.remoteAddress()) .map(e -> { return response(Result._00, e) }), Response.class) )
     */
  }

  public Mono<ServerResponse> logout(ServerRequest request) {
    return ok()
        .cookie(ResponseCookie.fromClientResponse(HttpHeaders.AUTHORIZATION, "").httpOnly(false)
            .sameSite("Strict").path("/").build())
        .contentType(MediaType.APPLICATION_JSON).body(response(Result._0), ResponseWrapper.class);
    /*
     * ok() .contentType(MediaType.APPLICATION_JSON)
     * .body(accountService.authenticate(request.bodyToMono(AccountEntity.class),
     * request.remoteAddress()) .map(e -> { return response(Result._00, e) }), Response.class) )
     */
  }


  /*
   * public Mono<ServerResponse> test(ServerRequest request){ return ok()
   * .contentType(MediaType.APPLICATION_JSON)
   * .body(request.bodyToMono(String.class).map(e->response(Result._0, e)), Response.class)
   * //.onErrorResume(e -> Mono.error(new UnauthorizedException(Result._999))) ; }
   */

  public Mono<ServerResponse> forgotPassword(ServerRequest request) {
    return request.bodyToMono(AccountEntity.class)
        .flatMap(account -> accountRepository.findByEmail(account.getEmail()))
        .switchIfEmpty(Mono.error(new AccountException(Result._108)))
        .publishOn(Schedulers.boundedElastic()).doOnNext(account -> {
          // 이메일 전송이 오래걸리므로 응답에 3~6초씩 걸림
          // 병목이 발생하지 않도록 별도 스레드를 통해 처리한다.
          Mono.fromRunnable(() -> {
            mailService.sendForgotPasswordEmail(account);
          }).subscribeOn(Schedulers.boundedElastic()).subscribe();
          /*
           * Mono.just(e) .publishOn(Schedulers.boundedElastic()) .subscribe(account->{
           * mailService.sendForgotPasswordEmail(account); });
           */
        })
        // .subscribeOn(Schedulers.boundedElastic())
        .flatMap(account -> ok().contentType(MediaType.APPLICATION_JSON)
            .body(response(Result._0, account), ResponseWrapper.class));
  }

  public Mono<ServerResponse> changePasswordPage(ServerRequest request) {
    return Mono.just(request.queryParam("email")).flatMap(emial -> {
      String token = request.pathVariable("token").replace("bearer-", "");

      Jws<Claims> jws = jwtVerifyHandler.getJwt(token);
      Claims claims = jws.getPayload();
      JwsHeader header = jws.getHeader();
      Date expiration = claims.getExpiration();

      if (!JwtIssuerType.FORGOT_PASSWORD.name()
          .equals(String.valueOf(header.get("jwtIssuerType")))) {
        return ok().contentType(MediaType.parseMediaType("text/html;charset=UTF-8"))
            .render("content/account/changePasswordExpired.html");
      } else if (expiration.before(new Date())) {
        return ok().contentType(MediaType.parseMediaType("text/html;charset=UTF-8"))
            .render("content/account/changePasswordExpired.html");
      }

      return ok().contentType(MediaType.parseMediaType("text/html;charset=UTF-8")).render(
          "content/account/changePassword.html",
          Map.of("email", claims.getSubject(), "token", token));
    }).onErrorResume(e -> {
      return Mono.error(new AccountException(Result._104));
    });
  }

  protected record ChangePasswordRequest(String email, String password, String newPassword) {
  }

  public Mono<ServerResponse> changePassword(ServerRequest request) {
    return request.bodyToMono(ChangePasswordRequest.class)
        .flatMap(
            changePasswordRequest -> accountRepository.findByEmail(changePasswordRequest.email())
                .switchIfEmpty(Mono.error(new AccountException(Result._1))).map(accountEntity -> {
                  accountEntity.setPassword(
                      accountService.passwordEncoder.encode(changePasswordRequest.password()));
                  return accountEntity;
                }))
        .flatMap(accountEntity -> accountRepository.save(accountEntity))
        .switchIfEmpty(Mono.error(new ForgotPasswordException(Result._108)))
        .flatMap(e -> ok().contentType(MediaType.APPLICATION_JSON).body(response(Result._0),
            ResponseWrapper.class));
  }

  public Mono<ServerResponse> web(ServerRequest request) {
    return ok().contentType(MediaType.parseMediaType("text/html;charset=UTF-8"))
        .render("electron_web/workspace3DPage.html");
  }

  public Mono<ServerResponse> webMain(ServerRequest request) {
    // Long workspaceId = Long.valueOf(request.pathVariable("workspaceId"));

    return ok().contentType(MediaType.parseMediaType("text/html;charset=UTF-8"))
        .render("electron_web/main.html");// , Map.of("workspaceId", workspaceId));
  }

  /*
   * public Mono<ServerResponse> mobileMultipleChatting(ServerRequest request){ //Long workspaceId =
   * Long.valueOf(request.pathVariable("workspaceId")); //Long roomId =
   * Long.valueOf(request.pathVariable("roomId")); return ok()
   * .contentType(MediaType.parseMediaType("text/html;charset=UTF-8"))
   * .render("electron_web/multipleChattingView.html");//, Map.of("workspaceId", workspaceId,
   * "roomId", roomId)); } public Mono<ServerResponse> mobileMultipleNoticeBoard(ServerRequest
   * request){ //Long workspaceId = Long.valueOf(request.pathVariable("workspaceId")); //Long roomId
   * = Long.valueOf(request.pathVariable("roomId")); return ok()
   * .contentType(MediaType.parseMediaType("text/html;charset=UTF-8"))
   * .render("electron_web/multipleNoticeBoard.html");//, Map.of("workspaceId", workspaceId,
   * "roomId", roomId)); }
   */
  public Mono<ServerResponse> createSubWindow(ServerRequest request) {
    // Long workspaceId = Long.valueOf(request.pathVariable("workspaceId"));
    // Long roomId = Long.valueOf(request.pathVariable("roomId"));
    String pageName = request.pathVariable("pageName");
    return ok().contentType(MediaType.parseMediaType("text/html;charset=UTF-8"))
        .render("electron_web/" + pageName + ".html");// , Map.of("workspaceId", workspaceId,
                                                      // "roomId", roomId));
  }

}
