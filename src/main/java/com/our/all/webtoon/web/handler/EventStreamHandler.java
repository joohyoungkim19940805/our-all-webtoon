package com.our.all.webtoon.web.handler;


import org.springframework.stereotype.Component;
import com.our.all.webtoon.dto.ServerSentStreamTemplate;
import lombok.Getter;
import reactor.core.publisher.Sinks;


@Component
public class EventStreamHandler {

	@Getter
	private Sinks.Many<ServerSentStreamTemplate<? extends Object>> commonSinks = Sinks.many().multicast().directAllOrNothing();

}
