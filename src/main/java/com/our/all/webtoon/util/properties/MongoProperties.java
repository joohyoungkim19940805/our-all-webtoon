package com.our.all.webtoon.util.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Configuration	
@ConfigurationProperties(prefix = "mongo")
@Getter
@Setter
public class MongoProperties {
	private String username;
	private String password;
	private String url;
}
