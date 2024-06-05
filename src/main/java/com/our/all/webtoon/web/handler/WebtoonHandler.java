package com.our.all.webtoon.web.handler;


import static com.our.all.webtoon.util.ResponseWrapper.response;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import com.our.all.webtoon.repository.webtoon.GenreRepository;
import com.our.all.webtoon.service.AccountService;
import com.our.all.webtoon.util.ResponseWrapper;
import com.our.all.webtoon.util.exception.BirdPlusException.Result;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@Component
public class WebtoonHandler {

	@Autowired
	private GenreRepository genreRepository;

	@Autowired
	private AccountService accountService;

	private static record GenreListResponse(
		String name,
		LocalDateTime createAt
	) {}

	public Mono<ServerResponse> genreList(
		ServerRequest request
	) {

		Flux<GenreListResponse> result = genreRepository
			.findAll( Sort.by( "name" ).descending() )
			.map( e -> new GenreListResponse( e.getName(), e.getCreatedAt() ) );

		return ok()
			.contentType( MediaType.APPLICATION_JSON )
			.body( response( Result._0, result ), ResponseWrapper.class );

	}

	private static record WebtoonRequest(
		Boolean agree
	) {}
	public Mono<ServerResponse> registWebtoon(
		ServerRequest request
	) {

		return null;
	}
}
