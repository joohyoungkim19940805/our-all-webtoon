package com.our.all.webtoon.config.security;

import java.net.URI;
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
import org.springframework.security.web.server.context.ServerSecurityContextRepository;
import org.springframework.security.web.server.savedrequest.ServerRequestCache;
import org.springframework.security.web.server.savedrequest.WebSessionServerRequestCache;
import org.springframework.stereotype.Component;
import com.our.all.webtoon.entity.account.AccountEntity;
import com.our.all.webtoon.entity.account.AccountEntity.ProviderInfo;
import com.our.all.webtoon.repository.account.AccountRepository;
import com.our.all.webtoon.service.AccountService;
import com.our.all.webtoon.util.constants.Provider;
import io.jsonwebtoken.Claims;
import reactor.core.publisher.Mono;


@Component
public class OAuth2LoginSuccessHandler implements ServerAuthenticationSuccessHandler {

    private final static ServerRequestCache requestCache = new WebSessionServerRequestCache();
    private final static ServerRedirectStrategy redirectStrategy =
            new DefaultServerRedirectStrategy();

    @Autowired
    private AccountService accountService;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtVerifyHandler jwtVerifyHandler;

	@Autowired
	private ServerSecurityContextRepository securityContextRepository;


    @Override
    public Mono<Void> onAuthenticationSuccess(WebFilterExchange webFilterExchange,
            Authentication authentication) {
        // TODO Auto-generated method stub
		OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();

		String userId = oauth2User.getName();
		String name = oauth2User.getAttribute( "name" );
		String email = oauth2User.getAttribute( "email" );
		String profileImageUrl = (String) oauth2User.getAttribute( "picture" );
		// String tokenValue = oauth2User.getAttribute( "token" );
		System.out.println( "kjh test ::: " + oauth2User );
		// System.out.println("kjh test ::: " + authentication.getCredentials());
		// System.out.println("kjh test ::: " + authentication.getAuthorities());
		// System.out.println("kjh test ::: " + authentication.getName());
		// System.out.println("kjh test ::: " + authentication.getDetails());
		// System.out.println("kjh test ::: " + authentication.getPrincipal());
		// System.out.println("kjh test ::: " + webFilterExchange);
		// System.out.println("kjh test ::: " + webFilterExchange);
		// System.out.println("kjh test ::: " +
		// webFilterExchange.getExchange().getRequest().getURI());
		// System.out.println(userId);
		// System.out.println(name);
		// System.out.println(email);
		// System.out.println(profileImageUrl);
		// System.out.println( tokenValue );
		// System.out.println("auth ::: " + authentication.getCredentials());
		// System.out.println(webFilterExchange.getExchange().getRequest().getQueryParams());
		// accountEntityMono.flatMap(accountEntity->)

		return accountRepository
			.findByLastProviderId( userId )
			.switchIfEmpty( accountRepository.findByEmail( email ) )
			.defaultIfEmpty(
				//
				AccountEntity
					.builder()//
					.username(name)//
					.email( email )//
					.profileImage( profileImageUrl )//
					.lastProviderId( userId )//
					.isEnabled( true )//
					.roles( List.of( Role.ROLE_USER ) )//
					.lastProvider( Provider.GOOGLE )
					.build() //
			)
			// TDOD 토큰 먼저 발급 후 save 해야 함 (db에 토큰 저장 필요) 2024 05 02 // 반영 완료 2024 05 03
			.map( accountEntity -> {
				Token token = accountService.generateAccessToken(accountEntity,JwtIssuerType.ACCOUNT);
				accountEntity.getProviderInfo().put(
					userId,
					ProviderInfo
						.builder()//
						.email( email )//
						.profileImageUrl( profileImageUrl )//
						.id( userId )
						.build()
				);
				accountRepository
					.save(
						//
						// TODO email 및 profileImage을 account 안에 각각 google{email:'',
						// profileImage:''},
						// naver{email:''}같은 형식으로 공급자별로 쌓이도록 변경 할 것 // 2024 05 13
						accountEntity
							.withLastProvider( Provider.GOOGLE )
							.withAccountName(
								accountEntity.getAccountName() == null ? email
									: accountEntity.getAccountName()
							)
							.withEmail(
								accountEntity.getEmail() == null ? email
									: accountEntity.getEmail()
							)
							.withProfileImage(
								accountEntity.getProfileImage() == null
									? profileImageUrl
									: accountEntity.getProfileImage()
							)
							.withLastProviderId( userId )
							.withIsEnabled( true )
							.withRoles( List.of( Role.ROLE_USER ) )//
							.withToken( token.getToken() )
							.withRefreshToken( token.getRefreshToken().getToken() )//
					)
					.subscribe();
				return token;

			} )//
			.flatMap( tokenResult -> jwtVerifyHandler.check( tokenResult.getToken() ) )
			.flatMap( verificationResult -> {

				Claims claims = verificationResult.claims;
				String subject = claims.getSubject();
				@SuppressWarnings("unchecked")
				List<String> roles = claims.get( "role", List.class );
				var authorities = roles.stream().map( SimpleGrantedAuthority::new ).toList();

				if (subject == null)
					return Mono.empty(); // invalid value for any of jwt auth parts

				var principal = new UserPrincipal( subject, claims.getIssuer() );

				Authentication auth = new UsernamePasswordAuthenticationToken(
					principal,
					verificationResult.getToken(),
					authorities
				);
				return Mono.defer( () -> {
					// 응답에 쿠키 추가
					webFilterExchange
						.getExchange()
						.getResponse()
						.addCookie(
							ResponseCookie
								.fromClientResponse(
									HttpHeaders.AUTHORIZATION,
									verificationResult.getToken()
								)
								.httpOnly( true )
								.sameSite( "Lax" )
								.path( "/" )
								.build()
						);

					// 리다이렉트 처리
					return OAuth2LoginSuccessHandler.requestCache
						.getRedirectUri( webFilterExchange.getExchange() )
						.defaultIfEmpty( URI.create( "/" ) )
						.flatMap(
							location -> OAuth2LoginSuccessHandler.redirectStrategy
								.sendRedirect( webFilterExchange.getExchange(), location )
						);

				}).contextWrite( ReactiveSecurityContextHolder.withAuthentication( auth ) );
				// ReactiveSecurityContextHolder.withAuthentication( auth );
				//
				// // SecurityContext 생성
				// SecurityContextImpl securityContext = new SecurityContextImpl( auth );
				//
				// // SecurityContext 저장
				// return securityContextRepository
				// .save( webFilterExchange.getExchange(), securityContext )
				// .then( Mono.defer( () -> {
				// // 응답에 쿠키 추가
				// webFilterExchange
				// .getExchange()
				// .getResponse()
				// .addCookie(
				// ResponseCookie
				// .fromClientResponse(
				// HttpHeaders.AUTHORIZATION,
				// verificationResult.getToken()
				// )
				// .httpOnly( true )
				// .sameSite( "Lax" )
				// .path( "/" )
				// .build()
				// );
				//
				// // 리다이렉트 처리
				// return OAuth2LoginSuccessHandler.requestCache
				// .getRedirectUri( webFilterExchange.getExchange() )
				// .defaultIfEmpty( URI.create( "/" ) )
				// .flatMap(
				// location -> OAuth2LoginSuccessHandler.redirectStrategy
				// .sendRedirect( webFilterExchange.getExchange(), location )
				// );
				//
				// } ).contextWrite( ReactiveSecurityContextHolder.withAuthentication( auth ) ) );
				// return Mono.justOrEmpty(auth);
			} );
		//

    }

}
