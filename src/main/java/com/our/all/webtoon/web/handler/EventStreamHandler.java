package com.our.all.webtoon.web.handler;


import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import com.our.all.webtoon.dto.ServerSentStreamTemplate;
import lombok.Getter;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Sinks;


@Component
public class EventStreamHandler {

	@Getter
	private Sinks.Many<ServerSentStreamTemplate<? extends Object>> commonSinks = Sinks.many().multicast().directAllOrNothing();

	public Mono<ServerResponse> emissionStream(ServerRequest request) {

		return null;
	}

}
