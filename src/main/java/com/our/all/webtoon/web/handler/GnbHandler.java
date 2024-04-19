package com.our.all.webtoon.web.handler;

import static org.springframework.web.reactive.function.server.ServerResponse.ok;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
public class GnbHandler {

    @PreAuthorize("hasRole('USER')")
    public Mono<ServerResponse> my(ServerRequest request) {
        return ok().contentType(MediaType.APPLICATION_JSON).body("test", String.class);
    }

}
