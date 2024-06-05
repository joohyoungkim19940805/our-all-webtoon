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
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import com.our.all.webtoon.entity.terms.TermsEntity;
import com.our.all.webtoon.repository.terms.TermsRepository;
import com.our.all.webtoon.util.properties.S3Properties;
import com.our.all.webtoon.vo.Editor;
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
@EnableMongoAuditing
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

    @Override
	public void run(ApplicationArguments args) throws Exception {

		createPaintingWebtoonTerms();
    }

	private void createPaintingWebtoonTerms() {
		String name = "운영원칙";
		Mono
			.just( "" )
			.filterWhen( e ->
			termsRepository.existsByName( name )
			)
			.switchIfEmpty( Mono.fromRunnable( () -> {
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
				termsRepository
					.save(
						TermsEntity
							.builder()
					.name("운영원칙")
					.content(termsContent)
							.build()
				);

			} ) )
			.subscribe();
	}

}