package com.our.all.webtoon.config.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.InMemoryReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.IdTokenClaimNames;

@Configuration
public class OAuth2GoogleLoginConfig {

    @Value("${login.google.client-id}")
    private String clientId;
    @Value("${login.google.client-secret}")
    private String clientSecret;


    @Bean
    public ReactiveClientRegistrationRepository clientRegistrationRepository() {
        return new InMemoryReactiveClientRegistrationRepository(this.googleClientRegistration());
    }

    private ClientRegistration googleClientRegistration() {
        System.out.println("kjh test ::: ");
        System.out.println(clientId);
        System.out.println(clientSecret);
        return ClientRegistration
            .withRegistrationId("google")//
            .clientId(clientId)//
            .clientSecret(clientSecret)//
            .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)//
            .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)//
            .redirectUri("{baseUrl}/login/oauth2/code/{registrationId}")//
            .scope("openid", "profile", "email", "address", "phone")//
            .authorizationUri("https://accounts.google.com/o/oauth2/v2/auth")//
            .tokenUri("https://www.googleapis.com/oauth2/v4/token")//
            .userInfoUri("https://www.googleapis.com/oauth2/v3/userinfo")//
            .userNameAttributeName(IdTokenClaimNames.SUB)//
            .jwkSetUri("https://www.googleapis.com/oauth2/v3/certs")//
            .clientName("Google")//
            .build();
    }
}
