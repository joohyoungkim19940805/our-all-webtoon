package com.our.all.webtoon.util.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 
 * @author kim.joohyoung
 *
 *         Google Login Properties
 */
@ToString
@Configuration
@ConfigurationProperties(prefix = "login.goolge")
@Getter
@Setter
public class LoginGoogleProperties {
    private String clientId;

    private String clientSecret;
}
