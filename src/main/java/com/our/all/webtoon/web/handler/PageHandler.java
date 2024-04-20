package com.our.all.webtoon.web.handler;

import static org.springframework.web.reactive.function.server.ServerResponse.ok;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
public class PageHandler {
    public Mono<ServerResponse> main(ServerRequest request) {
        return ok().contentType(MediaType.TEXT_HTML).render("/index.html");
    }

}
