package com.our.all.webtoon.util.properties;


import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


/**
 * @author kim.joohyoung
 *         GPT goole gemini
 */
@ToString
@Configuration
@ConfigurationProperties(prefix = "gpt.google")
@Getter
@Setter
public class GptGoogleProperties {

	private String key;

	private String url;
}
