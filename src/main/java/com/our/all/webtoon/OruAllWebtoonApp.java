package com.our.all.webtoon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.r2dbc.R2dbcAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

import com.our.all.webtoon.util.properties.S3Properties;

import software.amazon.awssdk.services.s3.model.PutObjectRequest;
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
    
    @Override
	public void run(ApplicationArguments args) throws Exception {
    	PutObjectRequest putObjectrRequest = PutObjectRequest.builder().build();
    }
}