package com.our.all.webtoon.config.security;


import java.net.URI;
import java.security.KeyPair;
import java.security.interfaces.RSAPublicKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.AuthenticationWebFilter;
import org.springframework.security.web.server.authentication.logout.RedirectServerLogoutSuccessHandler;
import org.springframework.security.web.server.authentication.logout.ServerLogoutSuccessHandler;
import org.springframework.security.web.server.header.ReferrerPolicyServerHttpHeadersWriter;
import org.springframework.security.web.server.header.XFrameOptionsServerHttpHeadersWriter.Mode;
import org.springframework.security.web.server.savedrequest.WebSessionServerRequestCache;
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatchers;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;


@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity(useAuthorizationManager = true)
@Component
public class WebFluxSecurityConfig {

	@Autowired
	private JwtVerifyHandler jwtVerifyHandler;

	@Autowired
	private SecurityContextRepository securityContextRepository;

	@Autowired
	private ReactiveClientRegistrationRepository clientRegistrationRepository;

	@Autowired
	private OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

	@Autowired
	private ReactiveAuthenticationManager authManager;

	@Autowired
	@Qualifier("jwtKeyPair")
	private KeyPair jwtKeyPair;

	/* @Bean public MapReactiveUserDetailsService userDetailsService() {
	 * 
	 * UserDetails admin =
	 * User.withUsername("admin").password(passwordEncoder().encode("password")).
	 * roles("USER",
	 * "ADMIN").build(); UserDetails testUser =
	 * User.withUsername("test").password(passwordEncoder().encode("password")).
	 * roles("USER","GUEST"
	 * ).build();
	 * 
	 * return new MapReactiveUserDetailsService(testUser, admin); } *///

	public ServerLogoutSuccessHandler logoutSuccessHandler(
		String uri
	) {

		RedirectServerLogoutSuccessHandler successHandler = new RedirectServerLogoutSuccessHandler();
		successHandler.setLogoutSuccessUrl( URI.create( uri ) );
		return successHandler;

	}

	@Bean
	public SecurityWebFilterChain springSecurityFilterChain(
		ServerHttpSecurity http
	) {

		return http
			.exceptionHandling(
				exceptionSpec -> exceptionSpec
					// .authenticationEntryPoint((swe,
					// error) -> Mono.fromRunnable(() -> swe.getResponse()
					// .setStatusCode(HttpStatus.UNAUTHORIZED)))
					.authenticationEntryPoint( new CustomRedirectEntryPoint() )
					.accessDeniedHandler(
						(swe, error) -> Mono
							.fromRunnable( () -> swe.getResponse().setStatusCode( HttpStatus.FORBIDDEN ) )
					)
			)

			.httpBasic(
				httpBasicSpec -> httpBasicSpec
					.authenticationEntryPoint(
						(swe, e) -> Mono
							.fromRunnable(
								() -> swe
									.getResponse()
									.setStatusCode( HttpStatus.UNAUTHORIZED )
							)
					)
					.authenticationManager( authManager )
			)

			.headers(
				headersSpec -> headersSpec
					.contentSecurityPolicy(
						contentSecuritySpec -> contentSecuritySpec
							.policyDirectives(
								"object-src 'self' blob: data: gap: https://bird-plus-s3.s3.ap-northeast-2.amazonaws.com https://bird-plus-s3-public.s3.ap-northeast-2.amazonaws.com 'unsafe-eval'; " + "default-src 'self' blob: data: gap: https://immersive-web.github.io https://bird-plus-s3.s3.ap-northeast-2.amazonaws.com https://bird-plus-s3-public.s3.ap-northeast-2.amazonaws.com 'unsafe-eval'; " + "frame-src 'self' blob: data: gap: https://bird-plus-s3.s3.ap-northeast-2.amazonaws.com https://bird-plus-s3-public.s3.ap-northeast-2.amazonaws.com 'unsafe-eval'; " + "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://storage.googleapis.com; " + "style-src 'self' 'unsafe-inline'; " + "img-src 'self' https: blob: data:; " + "media-src 'self' https: blob: data:; " + "font-src 'self' data:;"
							)
					)
					.referrerPolicy(
						referrerSpec -> referrerSpec
							.policy(
								ReferrerPolicyServerHttpHeadersWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN
							)
					)
					.permissionsPolicy(
						permissionsSpec -> permissionsSpec
							/**
							 * @see https://stackoverflow.com/questions/72135699/geolocation-api-granted-on-firefox-but-denied-on-chrome
							 */
							.policy( "camera=(), fullscreen=(self), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), sync-xhr=()" )
					)
					.frameOptions( frameSprc -> frameSprc.mode( Mode.SAMEORIGIN ) )
			)

			// .csrf( csrfSpec -> csrfSpec.disable() )

			.logout(
				logoutSpec -> logoutSpec
					.logoutUrl( "/logout" )
					.logoutSuccessHandler( logoutSuccessHandler( "/loginPage?status=logout" ) )

			)//
			.oauth2Login( oauth2Spec -> {
				oauth2Spec
					// .securityContextRepository( securityContextRepository )
					.clientRegistrationRepository( clientRegistrationRepository )
					.authenticationSuccessHandler( oAuth2LoginSuccessHandler );

				// .authenticationSuccessHandler(new OAuth2LoginSuccessHandler(userService));
			} )
			// .formLogin(formLoginSpec -> formLoginSpec
			// .authenticationSuccessHandler(
			// new RedirectServerAuthenticationSuccessHandler("/"))
			// .authenticationFailureHandler(
			// new RedirectServerAuthenticationFailureHandler(
			// "/page/layer/login-layer?status=error"))
			// .loginPage("/page/layer/login-layer"))

			// .requestCache(c->c.requestCache(new CookieServerRequestCache()))
			.requestCache( c -> c.requestCache( new WebSessionServerRequestCache() ) ) // RequestCache 설정

			.authenticationManager( authManager )
			.authorizeExchange(
				authSpec -> authSpec
					.pathMatchers( HttpMethod.OPTIONS )
					.permitAll()//
					.pathMatchers( "/api/auth/**" )
					.authenticated()//
					.pathMatchers( "/dashboard/**" )
					.authenticated()//

					.pathMatchers( "/**" )
					.permitAll()//
				// .pathMatchers("/files/**", "/dist/**", "images/**", "/**.ico", "/model/**",
				// "/manifest.json", "/Ads.txt", "/**.Ads.txt")
				// .permitAll()//
				// .pathMatchers("/", "/*", "/account-verify/*").permitAll() // auth
				// .pathMatchers("/v3/webjars/**", "/swagger-ui/**", "/v3/api-docs/**")
				// .permitAll() // api doc
				// .pathMatchers("/api/generate-presigned-url/test/").permitAll()
				// .anyExchange().authenticated()
			)

			.addFilterAt(
				bearerAuthenticationFilter( authManager ),
				SecurityWebFiltersOrder.AUTHENTICATION
			)

			.securityContextRepository( securityContextRepository )//
			.build();

	}

	// JWT Decoder 설정 (RSA 공개 키를 사용)
	@Bean
	public ReactiveJwtDecoder jwtDecoder() {

		return NimbusReactiveJwtDecoder.withPublicKey( (RSAPublicKey) jwtKeyPair.getPublic() ).build();

	}

	AuthenticationWebFilter bearerAuthenticationFilter(
		ReactiveAuthenticationManager authManager
	) {

		AuthenticationWebFilter bearerAuthenticationFilter = new AuthenticationWebFilter( authManager );
		bearerAuthenticationFilter
			.setServerAuthenticationConverter(
				new ServerHttpBearerAuthenticationConverter( this.jwtVerifyHandler )
			);
		bearerAuthenticationFilter
			.setRequiresAuthenticationMatcher( ServerWebExchangeMatchers.pathMatchers( "/**" ) );
		bearerAuthenticationFilter.setSecurityContextRepository( securityContextRepository );
		return bearerAuthenticationFilter;

	}

}
