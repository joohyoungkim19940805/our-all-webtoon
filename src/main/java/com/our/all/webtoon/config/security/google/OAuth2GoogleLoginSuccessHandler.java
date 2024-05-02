package com.our.all.webtoon.config.security.google;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.server.DefaultServerRedirectStrategy;
import org.springframework.security.web.server.ServerRedirectStrategy;
import org.springframework.security.web.server.WebFilterExchange;
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler;
import org.springframework.security.web.server.savedrequest.ServerRequestCache;
import org.springframework.security.web.server.savedrequest.WebSessionServerRequestCache;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import com.our.all.webtoon.config.security.JwtIssuerType;
import com.our.all.webtoon.config.security.JwtVerifyHandler;
import com.our.all.webtoon.config.security.Role;
import com.our.all.webtoon.config.security.UserPrincipal;
import com.our.all.webtoon.entity.account.AccountEntity;
import com.our.all.webtoon.repository.account.AccountRepository;
import com.our.all.webtoon.service.AccountService;
import com.our.all.webtoon.util.constants.ProviderAccount;
import io.jsonwebtoken.Claims;
import reactor.core.publisher.Mono;


@Component
public class OAuth2GoogleLoginSuccessHandler implements ServerAuthenticationSuccessHandler {

    private final static ServerRequestCache requestCache = new WebSessionServerRequestCache();
    private final static ServerRedirectStrategy redirectStrategy =
            new DefaultServerRedirectStrategy();

    @Autowired
    private AccountService accountService;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtVerifyHandler jwtVerifyHandler;

    @Override
    public Mono<Void> onAuthenticationSuccess(WebFilterExchange webFilterExchange,
            Authentication authentication) {
        // TODO Auto-generated method stub
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();

        String userId = oauth2User.getName();
        String name = oauth2User.getAttribute("name");
        String email = oauth2User.getAttribute("email");
        String profileImageUrl = (String) oauth2User.getAttribute("picture");
        String token = oauth2User.getAttribute("token");
        System.out.println("kjh test ::: " + oauth2User);
        System.out.println("kjh test ::: " + authentication.getCredentials());
        System.out.println("kjh test ::: " + authentication.getAuthorities());
        System.out.println("kjh test ::: " + authentication.getName());
        System.out.println("kjh test ::: " + authentication.getDetails());
        System.out.println("kjh test ::: " + authentication.getPrincipal());
        System.out.println("kjh test ::: " + webFilterExchange);
        System.out.println("kjh test ::: " + webFilterExchange);
        System.out.println("kjh test ::: " + webFilterExchange.getExchange().getRequest().getURI());
        System.out.println(userId);
        System.out.println(name);
        System.out.println(email);
        System.out.println(profileImageUrl);
        System.out.println(token);
        System.out.println("auth ::: " + authentication.getCredentials());

        // accountEntityMono.flatMap(accountEntity->)

        return accountRepository.findByProviderId(userId)
                .switchIfEmpty(accountRepository.findByEmail(email))
				.defaultIfEmpty( //
					AccountEntity
						.builder()//
						.accountName( name )//
						.email( email )//
						.profileImage( profileImageUrl )//
						.providerId( userId )//
						.isEnabled( true )//
						.roles( List.of( Role.ROLE_USER ) )//
						.provider( ProviderAccount.GOOGLE )
						.build() //
				)
			// TDOD 토큰 먼저 발급 후 save 해야 함 (db에 토큰 저장 필요) 2024 05 02
                .flatMap(accountEntity -> accountRepository.save(//
                    accountEntity.withProvider( ProviderAccount.GOOGLE )
							.withAccountName( name )
							.withEmail( email )
							.withProfileImage( profileImageUrl )
							.withProviderId( userId )
							.withIsEnabled( true )
							.withRoles( List.of( Role.ROLE_USER ) )//
                ))
                .map(accountEntity -> accountService.generateAccessToken(accountEntity,
                        JwtIssuerType.ACCOUNT))
                .flatMap(tokenResult -> jwtVerifyHandler.check(tokenResult.getToken()))
                .flatMap(verificationResult -> {

					Claims claims = verificationResult.claims;
					String subject = claims.getSubject();
                    @SuppressWarnings("unchecked")
                    List<String> roles = claims.get("role", List.class);
                    var authorities = roles.stream().map(SimpleGrantedAuthority::new).toList();

                    if (subject == null)
                        return Mono.empty(); // invalid value for any of jwt auth parts

                    var principal = new UserPrincipal(subject, claims.getIssuer());

                    Authentication auth = new UsernamePasswordAuthenticationToken(principal,
                            verificationResult.getToken(), authorities);

                    ReactiveSecurityContextHolder.withAuthentication(auth);

                    webFilterExchange.getExchange().getResponse()
                            .addCookie(ResponseCookie
                                    .fromClientResponse(HttpHeaders.AUTHORIZATION,
                                            verificationResult.getToken())
                                    .httpOnly(false).sameSite("Strict").path("/").build());

                    return OAuth2GoogleLoginSuccessHandler.requestCache
                            .getRedirectUri(webFilterExchange.getExchange())
                            .defaultIfEmpty(
                                    UriComponentsBuilder.newInstance().path("/").build().toUri())
                            .flatMap(location -> OAuth2GoogleLoginSuccessHandler.redirectStrategy
                                    .sendRedirect(webFilterExchange.getExchange(), location));
                    // return Mono.justOrEmpty(auth);
                });
        //


        // 2024 05 01 공급자 안만들고 아이디 또는 이메일로 디비 찾아서 insert and token 발급하고 리다이렉트 시키기
        // return Mono.empty();


        // // 2. 사용자 정보 DB 저장
        // User user = new User(userId, name, email, profileImageUrl);
        // userService.createUser(user);
        //
        // // 3. 로그인 세션 생성
        // SecurityContextHolder.getContext().setAuthentication(authentication);
        //
        // // 4. 성공 페이지 리다이렉트
        // super.onAuthenticationSuccess(request, response, authentication);
    }

    public static void main(String a[]) {
        Mono<String> aaa = Mono.just("abcd");
        Mono.zip(aaa.flatMap(e -> Mono.just(e + "aaa")), aaa.flatMap(e -> Mono.just(e + "bbb")))
                .flatMap(tuple -> {
                    System.out.println("kjh test 111 :::" + tuple.getT1());
                    System.out.println("kjh test 111 :::" + tuple.getT2());
                    return null;
                }).subscribe();
    }
}
