package com.our.all.webtoon.config.security;

import java.net.URI;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.server.DefaultServerRedirectStrategy;
import org.springframework.security.web.server.ServerAuthenticationEntryPoint;
import org.springframework.security.web.server.ServerRedirectStrategy;
import org.springframework.security.web.server.savedrequest.ServerRequestCache;
import org.springframework.security.web.server.savedrequest.WebSessionServerRequestCache;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

public class CustomRedirectEntryPoint implements ServerAuthenticationEntryPoint {

    private static final String DEFAULT_LOCATION = "/page/layer/login-layer";

    private ServerRedirectStrategy redirectStrategy = new DefaultServerRedirectStrategy();

    private ServerRequestCache requestCache = new WebSessionServerRequestCache();

    @Override
    public Mono<Void> commence(ServerWebExchange exchange, AuthenticationException ex) {
        boolean isHTML = exchange.getRequest().getHeaders().getAccept().stream()
                .filter(e -> e.equals(MediaType.TEXT_HTML)).findFirst().isPresent();
        if (!isHTML) {
            return Mono.fromRunnable(
                    () -> exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED));
        }

        String queryString = exchange.getRequest().getQueryParams().entrySet().stream()
                .flatMap(entry -> entry.getValue().stream().map(e -> entry.getKey() + "=" + e))
                .collect(Collectors.joining("&"));

        String redirectUrl =
                "?redirect-url=" + exchange.getRequest().getPath().toString() + "?" + queryString;

        return this.requestCache.saveRequest(exchange).then(this.redirectStrategy.sendRedirect(
                exchange, URI.create(CustomRedirectEntryPoint.DEFAULT_LOCATION + redirectUrl)));
    }

}
