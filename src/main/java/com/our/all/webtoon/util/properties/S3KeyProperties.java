package com.our.all.webtoon.util.properties;


import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import reactor.core.publisher.Mono;


@ToString
@Configuration
@ConfigurationProperties(prefix = "s3.key")
@Getter
@Setter
public class S3KeyProperties {


	public static void main(
		String a[]
	) {

		Mono<String> mono1 = Mono.just( "A" );
		Mono<String> mono2 = Mono.just( "B" );

		Mono<String> mergedMono = mono1.zipWith( mono2, (s1, s2) -> s1 + s2 );

		mergedMono.subscribe( System.out::println );

	}
}
