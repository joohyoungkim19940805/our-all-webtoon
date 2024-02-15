package com.our.all.webtoon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.r2dbc.R2dbcAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

//import com.hide_and_fps.project.repository.testRepository;

/*
 * 이 클래스의 패키지가 최상위 루트로 지정된다.
 */

@ComponentScan(basePackages = {
		"com.our.all.webtoon.*"
})
@SpringBootApplication(exclude = R2dbcAutoConfiguration.class)
@EnableMongoAuditing
public class OruAllWebtoonApp {
	public static void main(String[] args) {
		System.setProperty("jasypt.encryptor.password", System.getenv("MY_SERVER_PASSWORD"));
		System.setProperty("tinylog.configurationloader", "com.our.all.webtoon.util.PropertiesConfigurationLoader");

		SpringApplication.run(OruAllWebtoonApp.class, args);

	}
}