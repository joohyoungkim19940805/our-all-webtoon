package com.our.all.webtoon.web.handler;


import static com.our.all.webtoon.util.ResponseWrapper.response;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import com.our.all.webtoon.dto.Editor;
import com.our.all.webtoon.repository.webtoon.GenreRepository;
import com.our.all.webtoon.service.AccountService;
import com.our.all.webtoon.service.S3Service;
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

	@Autowired
	private S3Service s3Service;

	protected static record GenreListResponse(
		String name,
		LocalDateTime createAt
	) {}

	public Mono<ServerResponse> getGenreList(
		ServerRequest request
	) {

		Flux<GenreListResponse> result = genreRepository
			.findAll( Sort.by( "name" ).descending() )
			.map( e -> new GenreListResponse( e.getName(), e.getCreatedAt() ) );

		return ok()
			.contentType( MediaType.APPLICATION_JSON )
			.body( response( Result._0, result ), ResponseWrapper.class );

	}

	protected static record WebtoonRegistRequest(
		String id,
		Boolean agree,
		String webtoonTitle,
		List<String> genre,
		String summary,
		List<Editor> synopsisEditor,
		String thumbnail,
		String webtoon
	) {}
	public Mono<ServerResponse> registWebtoon(
		ServerRequest request
	) {
		

		Mono.zip( accountService.convertRequestToAccount( request ), request.bodyToMono( WebtoonRegistRequest.class ) )
		// .map( null )
		;

		// .zipWith( (accunt, t2) -> new Tuple2<>( accunt, request.bodyToMono( WebtoonRegistRequest ) ) );
//			.flatMap( account -> {
//
//				return s3Service.putObjectPresignedUrl( "webtoon/%s ".formatted( account.getId() ) );
//
//			} );
		// request.bodyToMono( WebtoonRequest. )
		return null;
	}

	// private static record WebtoonSynopsisOneLineSummaryRequest(String synopsis){}
	protected static record WebtoonSynopsisOneLineSummaryResponse(String oneLineSummary) {}

	public Mono<ServerResponse> getWebtoonSynopsisOneLineSummary(
		ServerRequest request
	) {

		return null;
	}

	// public Mono<ServerResponse> get
}
