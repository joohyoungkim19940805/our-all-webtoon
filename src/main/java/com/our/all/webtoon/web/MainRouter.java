package com.our.all.webtoon.web;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.POST;
import static org.springframework.web.reactive.function.server.RequestPredicates.accept;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;
import java.net.URI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;
import com.our.all.webtoon.web.handler.IndexHandler;


@Configuration
public class MainRouter implements MainRouterSwgger {

  @Bean
  @Override
  public RouterFunction<ServerResponse> index(IndexHandler indexHandler) {

    return route(GET("/"),
        req -> ServerResponse.temporaryRedirect(URI.create("/login-page")).build())
            // .and(route( GET("/test").and(accept(MediaType.APPLICATION_JSON)), indexHandler::test
            // ))
            .and(route(GET("/index").and(accept(MediaType.TEXT_HTML)), indexHandler::index))
            .and(route(GET("/login"),
                req -> ServerResponse.temporaryRedirect(URI.create("/login-page")).build()))
            .and(
                route(GET("/login-page").and(accept(MediaType.TEXT_HTML)), indexHandler::loginPage))
            .and(route(POST("/create").and(accept(MediaType.APPLICATION_JSON)),
                indexHandler::create))
            // .and(route( GET("/account-verify/{token}").and(accept(MediaType.TEXT_HTML)),
            // indexHandler::accountVerifyPage ))
            .and(route(POST("/account-verify").and(accept(MediaType.APPLICATION_JSON)),
                indexHandler::accountVerify))
            .and(route(POST("/login-processing").and(accept(MediaType.APPLICATION_JSON)),
                indexHandler::loginProcessing))
            .and(route(POST("/forgot-password-send-email").and(accept(MediaType.APPLICATION_JSON)),
                indexHandler::forgotPassword))
            // .and(route( GET("/change-password-page/{token}").and(accept(MediaType.TEXT_HTML)),
            // indexHandler::changePasswordPage ))
            .and(route(POST("/change-password").and(accept(MediaType.APPLICATION_JSON)),
                indexHandler::changePassword))
            // .and(route( GET("/web").and(accept(MediaType.TEXT_HTML)), indexHandler::web))
            // .and(route( GET("/web/main").and(accept(MediaType.TEXT_HTML)),
            // indexHandler::webMain))
            // .and(route( GET("/mobile/multiple-chatting").and(accept(MediaType.TEXT_HTML)),
            // mainHandler::mobileMultipleChatting))
            // .and(route( GET("/mobile/multiple-notice-board").and(accept(MediaType.TEXT_HTML)),
            // mainHandler::mobileMultipleNoticeBoard))
            // .and(route(
            // GET("/web/create-sub-window/{pageName}").and(accept(MediaType.TEXT_HTML)),
            // indexHandler::createSubWindow ))
            .and(route(GET("/logout").and(accept(MediaType.APPLICATION_JSON)),
                indexHandler::logout));
  }


}
