package com.our.all.webtoon;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.r2dbc.R2dbcAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.config.EnableReactiveMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;
import com.our.all.webtoon.dto.Editor;
import com.our.all.webtoon.entity.terms.TermsEntity;
import com.our.all.webtoon.entity.webtoon.GenreEntity;
import com.our.all.webtoon.repository.terms.TermsRepository;
import com.our.all.webtoon.repository.webtoon.GenreRepository;
import com.our.all.webtoon.util.properties.S3Properties;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

//import com.hide_and_fps.project.repository.testRepository;

/*
 * 이 클래스의 패키지가 최상위 루트로 지정된다.
 */

@ComponentScan(basePackages = {
		"com.our.all.webtoon.*"
})
@SpringBootApplication(exclude = R2dbcAutoConfiguration.class)
@EnableReactiveMongoAuditing
@EnableReactiveMongoRepositories
public class OruAllWebtoonApp implements ApplicationRunner  {
    
	public static void main(String[] args) {
		System.setProperty("jasypt.encryptor.password", System.getenv("MY_SERVER_PASSWORD"));
		SpringApplication.run(OruAllWebtoonApp.class, args);
	}
	
    @Value("${s3.sse-c.key}")
	private String s3SseCKey;
	
    @Value("${s3.sse-c.slat}")
	private String s3SseCSlat;
    
    @Autowired
	private S3Properties s3Properties;
	
	@Autowired
	private S3Presigner.Builder s3PresignerBuilder;
    
	@Autowired
	private TermsRepository termsRepository;

	@Autowired
	private GenreRepository genreRepository;

    @Override
	public void run(ApplicationArguments args) throws Exception {


		createDefaultPaintingWebtoonTerms().subscribe();
		createDefaultGenre().subscribe();

    }

	private Mono<Boolean> createDefaultPaintingWebtoonTerms() {

		String name = "웹툰 운영원칙";

		return termsRepository
			.existsByName( name )
			.filter( e -> ! e )
			.flatMap( exists -> {
				List<Editor> termsContent = List
					.of(
						Editor
							.builder()
							.type( 1 )
							.name( "HTMLDivElement" )
							.tagName( "div" )
							.data( """
									{
										"is_line": ""
									}
								""" )
							.childs(
								List
									.of(
										Editor
											.builder()
											.type( 3 )
											.name( "Text" )
											.text( "다른 사람의 저작권을 침해하거나 명예를 훼손하는 경우 관련 법률에 의거하여 제재 받을 수 있습니다." )
											.build()
									)
							)
							.build(),
						Editor
							.builder()
							.type( 1 )
							.name( "HTMLDivElement" )
							.tagName( "div" )
							.data( """
									{
										"is_line": ""
									}
								""" )
							.childs(
								List
									.of(
										Editor
											.builder()
											.type( 3 )
											.name( "Text" )
											.text( "성인물, 폭력물 등의 게시물은 별도의 통보 없이 삭제될 수 있습니다." )
											.build()
									)
							)
							.build()
					);
				return (Mono<Boolean>) termsRepository
					.save(
						TermsEntity
							.builder()
							.name( name )
							.content( termsContent )
							.build()
					)
					.defaultIfEmpty( TermsEntity.builder().build() )
					.map( e -> e.getId() != null );

			} );
    }

	private Mono<Boolean> createDefaultGenre() {

		return Flux.just( "추리", "다큐멘터리", "무협",
			"일상", "BL", "판타지",
			"사극", "러브코미디", "음악",
			"19", "이세계", "드라마",
			"학원", "먹방", "호러",
			"로맨스", "전생", "액션",
			"시대", "전기", "중세",
			"스릴러", "스포츠", "개그",
			"SF", "백합", "공포" )
			.filterWhen( name -> genreRepository.existsByName( name ).map( e -> ! e ) )
			.flatMap( name -> genreRepository.save( GenreEntity.builder().name( name ).build() ) )
			.all( e -> e.getId() != null );

	}


}