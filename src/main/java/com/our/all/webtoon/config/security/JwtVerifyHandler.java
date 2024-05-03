package com.our.all.webtoon.config.security;

import java.security.KeyPair;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.our.all.webtoon.repository.account.AccountRepository;
import com.our.all.webtoon.util.exception.AccountException;
import com.our.all.webtoon.util.exception.BirdPlusException.Result;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.jackson.io.JacksonDeserializer;
import io.jsonwebtoken.security.SignatureException;
import lombok.Getter;
import reactor.core.publisher.Mono;

public class JwtVerifyHandler {

    private KeyPair keyPair;
    private ObjectMapper om;

    public JwtVerifyHandler(KeyPair keyPair, ObjectMapper om) {
        this.keyPair = keyPair;
        this.om = om;
    }

    @Autowired
    private AccountRepository accountRepository;

    /**
     * 토큰의 유효성과 만료시간을 체크하는 함수
     * 
     * @param accessToken
     * @return
     */
    public Mono<VerificationResult> check(String token) {

        return getJwt(token).onErrorResume(e -> Mono.error(e)).map(jws -> {
            var claims = jws.getPayload();
            return new VerificationResult(claims, token);

        });
    }

    public Mono<Jws<Claims>> getJwt(String token, boolean isRefresh) {
        System.out.println("kjh ????????????");
        accountRepository.findByAccountName("mozu123").doOnNext(e -> {
            System.out.println("kjh test ::: ??? 222" + e);
        }).subscribe(e -> {
            System.out.println("kjh test ::: ???" + e);
        });
        try {
            return Mono.just(Jwts.parser().json(new JacksonDeserializer<Map<String, ?>>(this.om))
                    .verifyWith(keyPair.getPublic()).build().parseSignedClaims(token));
        } catch (ExpiredJwtException e) {
            // e.printStackTrace();
            // TODO 리프레시 토큰사용
            if (!isRefresh)
                return accountRepository.findByToken(token)
                        .switchIfEmpty(Mono.error(new AccountException(Result._100)))
                        .flatMap(account -> getJwt(account.getRefreshToken(), true));
            throw new AccountException(Result._100);
        } catch (UnsupportedJwtException e) {
            e.printStackTrace();
            throw new AccountException(Result._105);
        } catch (MalformedJwtException e) {
            // e.printStackTrace();
            throw new AccountException(Result._106);
        } catch (SignatureException e) {
            // e.printStackTrace();
            throw new AccountException(Result._107);
        }

    }

    public Mono<Jws<Claims>> getJwt(String token) {
        return getJwt(token, false);
    }

    @Getter
    public class VerificationResult {
        public Claims claims;
        public String token;

        public VerificationResult(Claims claims, String token) {
            this.claims = claims;
            this.token = token;
        }
    }
}

