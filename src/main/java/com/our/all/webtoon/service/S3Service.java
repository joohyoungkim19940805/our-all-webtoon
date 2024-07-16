package com.our.all.webtoon.service;


import java.net.URL;
import java.time.Duration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.our.all.webtoon.util.properties.S3Properties;
import reactor.core.publisher.Mono;
import software.amazon.awssdk.services.s3.S3AsyncClientBuilder;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;


@Service
public class S3Service {

	@Autowired
	private S3Properties s3Properties;

	@Autowired
	private S3Presigner.Builder s3PresignerBuilder;

	@Autowired
	private S3AsyncClientBuilder s3AsyncClientBuilder;

	public URL putObjectPresignedUrlForPublic(
		String key
	) {

		PutObjectRequest putObjectReuqest = PutObjectRequest
			.builder()
			.bucket( s3Properties.getBucketPublic() )
			.key( key )
			.build();
		PutObjectPresignRequest presignRequest = PutObjectPresignRequest
			.builder()
			.putObjectRequest( putObjectReuqest )
			.signatureDuration( Duration.ofHours( 1 ) )
			.build();
		return s3PresignerBuilder.build()
			.presignPutObject( presignRequest )
			.url();
	}

	// 업로드 먼저 작업 한 후 후작업
	// public void getHasKey() {
	// s3AsyncClientBuilder.build().list
	// }
	public static void main(
		String a[]
	)
		throws InterruptedException {

		Mono
			.just( "e" )
			.filter( e -> e.equals( "ea" ) )
			.mapNotNull( e -> true )
			.defaultIfEmpty( false )
			.subscribe( e -> {
				System.out.println( e );

			} );
		Thread.sleep( 99999 );
	}
}
