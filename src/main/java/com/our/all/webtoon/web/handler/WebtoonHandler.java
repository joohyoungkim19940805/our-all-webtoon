package com.our.all.webtoon.web.handler;


import static com.our.all.webtoon.util.ResponseWrapper.response;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import com.our.all.webtoon.dto.Editor;
import com.our.all.webtoon.entity.webtoon.WebtoonEntity;
import com.our.all.webtoon.repository.webtoon.GenreRepository;
import com.our.all.webtoon.repository.webtoon.WebtoonRepository;
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
	private WebtoonRepository webtoonRepository;

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
		List<Editor> synopsis,
		String webtoon,
		String thumbnailExtension
	) {}

	protected static record WebtoonRegistResponse(URL url) {}
	public Mono<ServerResponse> registWebtoon(
		ServerRequest request
	) {
		

		Mono<URL> result = Mono
			.zip(
				accountService.convertRequestToAccount( request ),
				request.bodyToMono( WebtoonRegistRequest.class ) )
			.flatMap(
				t -> t.getT2().id != null ? webtoonRepository.findByIdAndAccountId(
					t.getT2().id,
					t.getT1()
						.getId() //
				)
					.map(
						e -> e.withTitle( t.getT2().webtoonTitle )
							.withSynopsis( t.getT2().synopsis )
							.withGenre( t.getT2().genre )
							.withThumbnail(
								t.getT2().thumbnailExtension == null ? e.getThumbnail()
									: t.getT2().thumbnailExtension ) )
					: Mono.just(
						WebtoonEntity.builder()
							.accountId(
								t.getT1()
									.getId() )
							.title( t.getT2().webtoonTitle )
							.synopsis( t.getT2().synopsis )
							.genre( t.getT2().genre )
							.thumbnail( t.getT2().thumbnailExtension )
							.build() //
					)//
			)
			.flatMap( e -> webtoonRepository.save( e ) )
			.map(
				e -> 
					s3Service.putObjectPresignedUrlForPublic(
					"%s/%s/%s/%s".formatted(
						e.getAccountId(),
						e.getId(),
						"thumbnail",
						e.getId() + e.getThumbnail() //
					)//
				) //
			);
		return ok()
			.contentType( MediaType.APPLICATION_JSON )
			.body( response( Result._0, result ), ResponseWrapper.class );
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
