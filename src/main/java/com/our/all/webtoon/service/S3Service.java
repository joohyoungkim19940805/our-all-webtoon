package com.our.all.webtoon.service;


import java.net.URL;
import java.time.Duration;
import org.springframework.beans.factory.annotation.Autowired;
import com.our.all.webtoon.util.properties.S3Properties;
import reactor.core.publisher.Mono;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

public class S3Service {

	@Autowired
	private S3Properties s3Properties;

	@Autowired
	private S3Presigner.Builder s3PresignerBuilder;

	public Mono<URL> putObjectPresignedUrl(
		String key
	) {

		return Mono.fromCallable( () -> {
			PutObjectRequest putObjectReuqest = PutObjectRequest
				.builder()
				.bucket( s3Properties.getBucket() )
				.key( key )
				.build();
			PutObjectPresignRequest presignRequest = PutObjectPresignRequest
				.builder()
				.putObjectRequest( putObjectReuqest )
				.signatureDuration( Duration.ofHours( 1 ) )
				.build();
			return s3PresignerBuilder.build().presignPutObject( presignRequest ).url();

		} );
	}

}
