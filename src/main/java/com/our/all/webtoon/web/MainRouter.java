package com.our.all.webtoon.web;

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
import com.our.all.webtoon.web.handler.GnbHandler;
import com.our.all.webtoon.web.handler.IndexHandler;
import com.our.all.webtoon.web.handler.PageHandler;


@Configuration
public class MainRouter {

    @Bean
    public RouterFunction<ServerResponse> page(PageHandler pageHandler) {
        route().filter((req, res) -> {
            return pageHandler.
        });

        return null;
    }

    @Bean
    public RouterFunction<ServerResponse> index() {
        return route(GET("/"), req -> ServerResponse.temporaryRedirect(URI.create("/page/main")).build());
    }

    @Bean
    public RouterFunction<ServerResponse> page2(PageHandler pageHandler) {
        //
        return route()
            .nest(
                path("/page"), mainPathBuilder -> mainPathBuilder
                    .GET("/main", accept(MediaType.TEXT_HTML), pageHandler::main)
                    // .GET("/get-account-info", accept(MediaType.APPLICATION_JSON), accountHandler::getAccountInfo)
                    .build()

            ).build();
    }

    @Bean
    public RouterFunction<ServerResponse> index2(IndexHandler indexHandler) {

        return route(GET("/").and(accept(MediaType.TEXT_HTML)), indexHandler::index)

            .and(route(POST("/create").and(accept(MediaType.APPLICATION_JSON)), indexHandler::create))

            // .and(route(
            // GET("/account-verify/{token}").and(accept(MediaType.TEXT_HTML)),
            // indexHandler::accountVerifyPage ))
            .and(route(POST("/account-verify").and(accept(MediaType.APPLICATION_JSON)), indexHandler::accountVerify))

            .and(route(POST("/login-processing").and(accept(MediaType.APPLICATION_JSON)), indexHandler::loginProcessing))

            .and(route(POST("/forgot-password-send-email").and(accept(MediaType.APPLICATION_JSON)), indexHandler::forgotPassword))

            // .and(route(
            // GET("/change-password-page/{token}").and(accept(MediaType.TEXT_HTML)),
            // indexHandler::changePasswordPage ))
            .and(route(POST("/change-password").and(accept(MediaType.APPLICATION_JSON)), indexHandler::changePassword))

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
            .and(route(GET("/logout").and(accept(MediaType.APPLICATION_JSON)), indexHandler::logout));
    }

    @Bean
    public RouterFunction<ServerResponse> gnb(GnbHandler gnbHandler) {
        return route()
            .nest(path("/gnb"), builder -> builder.nest(path("search"), searchPathBuilder -> searchPathBuilder.GET("/my", accept(MediaType.APPLICATION_JSON), gnbHandler::my).build())).build();
    }
}
