package com.our.all.webtoon.config.security.google;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.server.WebFilterExchange;
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler;
import reactor.core.publisher.Mono;

public class OAuth2GoogleLoginSuccessHandler implements ServerAuthenticationSuccessHandler {

    @Override
    public Mono<Void> onAuthenticationSuccess(WebFilterExchange webFilterExchange,
            Authentication authentication) {
        // TODO Auto-generated method stub
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();

        String userId = oauth2User.getName();
        String name = oauth2User.getAttribute("name");
        String email = oauth2User.getAttribute("email");
        String profileImageUrl = (String) oauth2User.getAttribute("profileImage");
        String token = oauth2User.getAttribute("token");
        System.out.println("kjh test ::: " + oauth2User);
        System.out.println("kjh test ::: " + authentication.getCredentials());
        System.out.println("kjh test ::: " + authentication.getAuthorities());
        System.out.println("kjh test ::: " + authentication.getName());
        System.out.println("kjh test ::: " + authentication.getDetails());
        System.out.println("kjh test ::: " + authentication.getPrincipal());
        System.out.println("kjh test ::: " + webFilterExchange.getExchange());
        System.out.println("kjh test ::: " + webFilterExchange);
        System.out.println("kjh test ::: " + webFilterExchange.getExchange().getRequest().getURI());
        System.out.println(userId);
        System.out.println(name);
        System.out.println(email);
        System.out.println(profileImageUrl);
        System.out.println(token);
        System.out.println("auth ::: " + authentication.getCredentials());
        return Mono.empty();


        // // 2. 사용자 정보 DB 저장
        // User user = new User(userId, name, email, profileImageUrl);
        // userService.createUser(user);
        //
        // // 3. 로그인 세션 생성
        // SecurityContextHolder.getContext().setAuthentication(authentication);
        //
        // // 4. 성공 페이지 리다이렉트
        // super.onAuthenticationSuccess(request, response, authentication);
    }

}
