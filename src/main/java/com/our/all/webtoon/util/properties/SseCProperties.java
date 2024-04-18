package com.our.all.webtoon.util.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Configuration	
@ConfigurationProperties(prefix = "s3.sse-c")
@Getter
@Setter
public class SseCProperties {
	private String key;
	private String slat;
	private String customProvidedKey;
}
