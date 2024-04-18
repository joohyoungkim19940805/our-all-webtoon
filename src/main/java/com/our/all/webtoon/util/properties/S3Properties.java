package com.our.all.webtoon.util.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import software.amazon.awssdk.regions.Region;

@ToString
@Configuration
@ConfigurationProperties(prefix = "s3")
@Getter
@Setter
public class S3Properties {

	private String accessKey;
	
	private String securityKey;
	
	private String region;
	
	private String bucket;
	
	private String bucketPublic;
	private SseCProperties sseCProperties;
}
