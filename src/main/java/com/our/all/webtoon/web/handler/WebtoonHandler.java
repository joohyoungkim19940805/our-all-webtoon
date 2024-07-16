package com.our.all.webtoon.web.handler;


import static com.our.all.webtoon.util.ResponseWrapper.response;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import com.our.all.webtoon.dto.Editor;
import com.our.all.webtoon.entity.terms.TermsOfAccountEntity;
import com.our.all.webtoon.entity.terms.code.TermsOfServiceNames;
import com.our.all.webtoon.entity.webtoon.WebtoonEntity;
import com.our.all.webtoon.repository.terms.TermOfAccountRepository;
import com.our.all.webtoon.repository.terms.TermOfServiceRepository;
import com.our.all.webtoon.repository.webtoon.GenreRepository;
import com.our.all.webtoon.repository.webtoon.WebtoonRepository;
import com.our.all.webtoon.service.AccountService;
import com.our.all.webtoon.service.S3Service;
import com.our.all.webtoon.util.ResponseWrapper;
import com.our.all.webtoon.util.exception.BirdPlusException.Result;
import lombok.Builder;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Sinks;


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

	@Autowired
	private TermOfAccountRepository termOfAccountRepository;

	@Autowired
	private TermOfServiceRepository termOfServiceRepository;

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
		String thumbnailExtension
	) {}

	public Mono<ServerResponse> registWebtoon(
		ServerRequest request
	) {
		
		Mono<String> result = Mono
			.zip(
				accountService.convertRequestToAccount( request ),
				request.bodyToMono( WebtoonRegistRequest.class ) )
			.filter( e -> e.getT2().agree )
			.switchIfEmpty( Mono.error( new Exception( "TOTD need create termsException class " ) ) )
			.doOnNext( e -> {
				// 웹툰 운영 원칙 저장
				termOfServiceRepository
					.findByTermsOfServiceName( TermsOfServiceNames.웹툰_운영원칙 )
					.map( termsService -> TermsOfAccountEntity.builder().accountId( e.getT1().getId() ).termsOfServiceId( termsService.getId() ).build() )
					.flatMap( termOfAccountRepository::save )
					.subscribe();
			} )
			.flatMap(t -> {
				Mono<WebtoonEntity> webtoonEntity = t.getT2().id != null ? webtoonRepository.findByIdAndAccountId(
					t.getT2().id,
					t.getT1()
						.getId() //
				)
					.map(
						e -> e.withTitle( t.getT2().webtoonTitle )
							.withSynopsis( t.getT2().synopsis )
							.withGenre( t.getT2().genre )
					)
					: Mono.just(
						WebtoonEntity.builder()
							.accountId(
								t.getT1()
									.getId() )
							.title( t.getT2().webtoonTitle )
							.synopsis( t.getT2().synopsis )
							.genre( t.getT2().genre )
							.build() //
					);//

				return webtoonEntity.zipWith( Mono.just( t.getT2().thumbnailExtension == null ? "" : t.getT2().thumbnailExtension ) );

			} )
			.flatMap( e -> {

				if (e.getT2().isBlank())
					return webtoonRepository.save( e.getT1() ).zipWith( Mono.just( false ) );

				String key = "%s/%s/%s/%s".formatted(
					e.getT1().getAccountId(),
					e.getT1().getId(),
					"thumbnail",
					e.getT1().getId() + e.getT2()
				);
				boolean isNewFile = ! key.equals( e.getT1().getThumbnail() );
				if(isNewFile) 
					e.getT1().withThumbnail( key );
				
				return webtoonRepository.save( e.getT1() ).zipWith( Mono.just( isNewFile ) );

			} )
			.filter( e -> e.getT2() )
			.map(
				e -> s3Service.putObjectPresignedUrlForPublic( e.getT1().getThumbnail() ).toString()//
			)
			.defaultIfEmpty( "" );
		return ok()
			.contentType( MediaType.APPLICATION_JSON )
			.body( response( Result._0, result ), ResponseWrapper.class );
	}

	@Builder
	protected static record MyWebtoonListResponse(
		String id,
		String webtoonTitle,
		List<String> genre,
		// String summary,
		List<Editor> synopsis,
		String thumbnail
	) {}

	public Mono<ServerResponse> searchMyWebtoonList(
		ServerRequest request
	) {

		Sinks.Many<MyWebtoonListResponse> sinks = Sinks.many().unicast().onBackpressureBuffer();
		
		// Flux<MyWebtoonListResponse> result =
		accountService
			.convertRequestToAccount( request )
			.flatMapMany( account -> webtoonRepository.findAllByAccountId( account.getId() ) )
			.map(
				e -> MyWebtoonListResponse
					.builder()
					.id( e.getId() )
					.webtoonTitle( e.getTitle() )
					.genre( e.getGenre() )
					.synopsis( e.getSynopsis() )
					.thumbnail( e.getThumbnail() )
					.build()
			)
			.doOnNext( e -> {
				sinks.tryEmitNext( e );
			} )
			.delayElements( Duration.ofMillis( 1000 ) )
			.doFinally( e -> {
				sinks.tryEmitComplete();
			} )
			.subscribe();
		return ok()
			.contentType( MediaType.TEXT_EVENT_STREAM )
			.body( sinks.asFlux(), MyWebtoonListResponse.class );
	}

}
