package com.our.all.webtoon.config.security;

import java.net.URI;
import java.util.stream.Collectors;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.server.DefaultServerRedirectStrategy;
import org.springframework.security.web.server.ServerAuthenticationEntryPoint;
import org.springframework.security.web.server.ServerRedirectStrategy;
import org.springframework.security.web.server.savedrequest.ServerRequestCache;
import org.springframework.security.web.server.savedrequest.WebSessionServerRequestCache;
import org.springframework.util.Assert;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

public class CustomRedirectEntryPoint implements ServerAuthenticationEntryPoint {

    private static final String DEFAULT_LOCATION = "/page/layer/login-layer";

    private ServerRedirectStrategy redirectStrategy = new DefaultServerRedirectStrategy();

    private ServerRequestCache requestCache = new WebSessionServerRequestCache();

    /**
     * The request cache to use to save the request before sending a redirect.
     * 
     * @param requestCache the cache to redirect to.
     */
    public void setRequestCache(ServerRequestCache requestCache) {
        Assert.notNull(requestCache, "requestCache cannot be null");
        this.requestCache = requestCache;
    }

    @Override
    public Mono<Void> commence(ServerWebExchange exchange, AuthenticationException ex) {
        System.out.println(exchange.getRequest());
        System.out.println(exchange.getRequest().getPath());
        System.out.println(exchange.getRequest().getQueryParams());

        String queryString = exchange.getRequest().getQueryParams().entrySet().stream()
                .flatMap(entry -> entry.getValue().stream().map(e -> entry.getKey() + "=" + e))
                .collect(Collectors.joining("&"));

        String redirectUrl =
                "?redirect-url=" + exchange.getRequest().getPath().toString() + "?" + queryString;

        System.out.println("kjh test 222 ::: " + redirectUrl);

        return this.requestCache.saveRequest(exchange).then(this.redirectStrategy.sendRedirect(
                exchange, URI.create(CustomRedirectEntryPoint.DEFAULT_LOCATION + redirectUrl)));
    }

    /**
     * Sets the RedirectStrategy to use.
     * 
     * @param redirectStrategy the strategy to use. Default is DefaultRedirectStrategy.
     */
    public void setRedirectStrategy(ServerRedirectStrategy redirectStrategy) {
        Assert.notNull(redirectStrategy, "redirectStrategy cannot be null");
        this.redirectStrategy = redirectStrategy;
    }

}
