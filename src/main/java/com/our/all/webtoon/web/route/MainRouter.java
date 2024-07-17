package com.our.all.webtoon.web.route;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.POST;
import static org.springframework.web.reactive.function.server.RequestPredicates.accept;
import static org.springframework.web.reactive.function.server.RequestPredicates.path;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;
import java.net.URI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;
import com.our.all.webtoon.web.handler.AccountHandler;
import com.our.all.webtoon.web.handler.IndexHandler;
import com.our.all.webtoon.web.handler.PageHandler;
import com.our.all.webtoon.web.handler.TermsHandler;
import com.our.all.webtoon.web.handler.WebtoonHandler;


@Configuration
public class MainRouter {

	@Bean
	public RouterFunction<ServerResponse> page(
		PageHandler pageHandler
	) {

		return route(
			//
			request -> request.path().startsWith( "/page" ) && request.headers().accept().contains( MediaType.TEXT_HTML ),
			request -> pageHandler.main( request )
		)
			.and(
				route(
					request -> request.path().startsWith( "/dashboard" ) && request.headers().accept().contains( MediaType.TEXT_HTML ),
					request -> pageHandler.dashboard( request )
				)
			);

	}

	@Bean
	public RouterFunction<ServerResponse> index(
		IndexHandler indexHandler
	) {

		return route(
			GET( "/" ),
			req -> ServerResponse.temporaryRedirect( URI.create( "/page/main" ) ).build()
		);

	}

	@Bean
	public RouterFunction<ServerResponse> account(
		AccountHandler accountHandler
	) {

		return route()
			.nest(
				path( "/api/account" ),
				builder -> builder
					.nest(
						path( "search" ),
						searchPathBuilder -> searchPathBuilder
							.GET(
								"/is-login",
								accept( MediaType.APPLICATION_JSON ),
								accountHandler::isLogin
							)
							.GET(
								"/get-info",
								accept( MediaType.APPLICATION_JSON ),
								accountHandler::getAccountInfo
							)
							.build()
					)
					/* .nest(path("/create"), createPathBuilder -> createPathBuilder .build()) */
					.nest(
						path( "update" ),
						updatePathBuilder -> updatePathBuilder
							.PUT(
								"/change-info",
								accept( MediaType.APPLICATION_JSON ),
								accountHandler::isLogin
							)
							.build()
					)//

			)
			.build();

	}

	@Bean
	public RouterFunction<ServerResponse> webtoon(
		WebtoonHandler webtoonHandler
	) {

		return route()
			.nest(
				path( "/api/webtoon" ),
				builder -> builder
					.nest(
						path( "search" ),
						searchPathBuilder -> searchPathBuilder
							.GET( "/genre", accept( MediaType.APPLICATION_JSON ), webtoonHandler::getGenreList )
							.GET( "/list", accept( MediaType.TEXT_EVENT_STREAM ), webtoonHandler::searchMyWebtoonList )
							.build()
					)
					/* .nest(path("/create"), createPathBuilder -> createPathBuilder .build()) */
					.nest(
						path( "update" ),
						updatePathBuilder -> updatePathBuilder
							.PUT( "/change-info", accept( MediaType.APPLICATION_JSON ), webtoonHandler::getGenreList )
							.build()
					)
					.nest(
						path( "regist" ),
						registPathBuilder -> registPathBuilder
							.POST( "/content", accept( MediaType.APPLICATION_JSON ), webtoonHandler::registWebtoon )
							.build()
					)
			)
			.build();

	}
    
    @Bean
	public RouterFunction<ServerResponse> terms(
		TermsHandler termsHandler
	) {

		return route()
			.nest(
				path( "/api/terms" ),
				builder -> builder
					.nest(
						path( "search" ),
						searchPathBuilder -> searchPathBuilder
							.GET(
								"/webtoon-terms",
								accept( MediaType.APPLICATION_JSON ),
								termsHandler::getWebtoonTerms
							)
							.build()
					)

			)
			.build();
1
	}

	@Bean
    public RouterFunction<ServerResponse> index2(IndexHandler indexHandler) {

        return route(GET("/").and(accept(MediaType.TEXT_HTML)), indexHandler::index)

                .and(route(POST("/create").and(accept(MediaType.APPLICATION_JSON)),
                        indexHandler::create))

                // .and(route(
                // GET("/account-verify/{token}").and(accept(MediaType.TEXT_HTML)),
                // indexHandler::accountVerifyPage ))
                .and(route(POST("/account-verify").and(accept(MediaType.APPLICATION_JSON)),
                        indexHandler::accountVerify))

                .and(route(POST("/login-processing").and(accept(MediaType.APPLICATION_JSON)),
                        indexHandler::loginProcessing))

                .and(route(
                        POST("/forgot-password-send-email").and(accept(MediaType.APPLICATION_JSON)),
                        indexHandler::forgotPassword))

                // .and(route(
                // GET("/change-password-page/{token}").and(accept(MediaType.TEXT_HTML)),
                // indexHandler::changePasswordPage ))
                .and(route(POST("/change-password").and(accept(MediaType.APPLICATION_JSON)),
                        indexHandler::changePassword))

                // .and(route( GET("/web").and(accept(MediaType.TEXT_HTML)),
                // indexHandler::web))
                // .and(route( GET("/web/main").and(accept(MediaType.TEXT_HTML)),
                // indexHandler::webMain))
                // .and(route(
                // GET("/mobile/multiple-chatting").and(accept(MediaType.TEXT_HTML)),
                // mainHandler::mobileMultipleChatting))
                // .and(route(
                // GET("/mobile/multiple-notice-board").and(accept(MediaType.TEXT_HTML)),
                // mainHandler::mobileMultipleNoticeBoard))
                // .and(route(
                // GET("/web/create-sub-window/{pageName}").and(accept(MediaType.TEXT_HTML)),
                // indexHandler::createSubWindow ))
                .and(route(GET("/logout").and(accept(MediaType.APPLICATION_JSON)),
                        indexHandler::logout));
    }

}
