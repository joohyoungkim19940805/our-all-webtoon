package com.our.all.webtoon.service;

import java.net.InetSocketAddress;
import java.security.KeyPair;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.our.all.webtoon.config.security.JwtIssuerType;
import com.our.all.webtoon.config.security.JwtVerifyHandler;
import com.our.all.webtoon.config.security.Role;
import com.our.all.webtoon.config.security.Token;
import com.our.all.webtoon.config.security.TokenTemplate;
import com.our.all.webtoon.config.security.UserPrincipal;
import com.our.all.webtoon.entity.account.AccountEntity;
import com.our.all.webtoon.entity.account.AccountLogEntity;
import com.our.all.webtoon.repository.account.AccountLogRepository;
import com.our.all.webtoon.repository.account.AccountRepository;
import com.our.all.webtoon.util.exception.AccountException;
import com.our.all.webtoon.util.exception.BirdPlusException.Result;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.impl.security.StandardSecureDigestAlgorithms;
import io.jsonwebtoken.jackson.io.JacksonSerializer;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;


@Component
@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    public PasswordEncoder passwordEncoder;
    @Autowired
    private AccountLogRepository accountLogRepository;
    @Autowired
    private MailService mailService;
    @Autowired
    private ObjectMapper om;

    @Autowired
    private KeyPair keyPair;

    @Autowired
    private JwtVerifyHandler jwtVerifyHandler;

    /**
     * 엑세스 토큰을 생성하는 함수
     * 
     * @param user
     * @return
     */
    public Token generateAccessToken(TokenTemplate tokenTemplate, JwtIssuerType type) {

        Map<String, List<Role>> claims = Map.of("role", tokenTemplate.getRoles());

        var createdDate = new Date();

        var token = Jwts.builder().json(new JacksonSerializer<Map<String, ?>>(this.om))
                .claims(claims).issuer(tokenTemplate.getIssuer())
                .subject(tokenTemplate.getSubject()).issuedAt(createdDate)
                .id(UUID.randomUUID().toString())
                // .setHeaderParams(Map.of("typ", "jwt", "alg", "HS256"))
                // .signWith(Keys.hmacShaKeyFor(secret.getBytes()), SignatureAlgorithm.HS256)
                .header()
                .add(Map.of("typ", "jwt", "alg", "RS256", "name", tokenTemplate.getName(),
                        "jwtIssuerType", type.name()))
                .and().signWith(keyPair.getPrivate(),
                        StandardSecureDigestAlgorithms.findBySigningKey(keyPair.getPrivate()))//
        ;
        Date expirationDate = null;
        if (type.equals(JwtIssuerType.BOT)) {
            expirationDate = new Date(new Date().getTime() + LocalDate.of(9000, 12, 31)
                    .atStartOfDay(ZoneOffset.systemDefault()).toInstant().toEpochMilli());
        } else {
            var expirationTimeInMilliseconds = type.getSecond() * 1000;
            expirationDate = new Date(new Date().getTime() + expirationTimeInMilliseconds);
        }
        token.expiration(expirationDate);
        return Token.builder().token(token.compact()).issuedAt(createdDate)
                .expiresAt(expirationDate)
                .refreshToken(type.equals(JwtIssuerType.ACCOUNT)
                        ? generateAccessToken(tokenTemplate, JwtIssuerType.REFRESH)
                        : null)
                // .isDifferentIp(account.getIsDifferentIp())
                // .isFirstLogin(account.getIsFirstLogin())
                .build();
    }

    public Mono<Token> authenticate(Mono<AccountEntity> accountEntityMono,
            Optional<InetSocketAddress> optional) {
        return accountEntityMono.flatMap(accountInfo -> {
            return accountRepository.findByAccountName(accountInfo.getAccountName())
                    .switchIfEmpty(Mono.error(new AccountException(Result._103)))
                    .flatMap(account -> {

                        if (!account.getIsEnabled()) {
                            // 이메일 전송이 오래걸리므로 응답에 3~6초씩 걸림
                            // 병목이 발생하지 않도록 별도 스레드를 통해 처리한다.
                            Mono.fromRunnable(() -> {
                                mailService.sendAccountVerifyTemplate(account);
                            }).subscribeOn(Schedulers.boundedElastic()).subscribe();

                            return Mono.error(new AccountException(Result._101));
                        } else if (accountInfo.getPassword() == null || !passwordEncoder
                                .encode(accountInfo.getPassword()).equals(account.getPassword())) {
                            return Mono.error(new AccountException(Result._102));
                        } else {
                            AccountLogEntity accountLogEntity = AccountLogEntity.builder()
                                    .accountId(account.getAccountName())
                                    .ip(optional.get().getAddress().getHostAddress()).build();

                            return accountLogRepository.save(accountLogEntity)
                                    .flatMap(e -> Mono.just(
                                            generateAccessToken(account, JwtIssuerType.ACCOUNT)
                                                    .toBuilder()
                                                    // .userId(account.getId())
                                                    .build())//
                            );
                        }
                    });
        });
    }

    public Mono<AccountEntity> createUser(Mono<AccountEntity> accountMono) {
        return accountMono
                .map(account -> account.toBuilder()
                        .password(passwordEncoder.encode(account.getPassword()))
                        .roles(List.of(Role.ROLE_USER, Role.ROLE_GUEST)).isEnabled(false).build())
                .flatMap(account -> accountRepository.save(account)).doOnSuccess(account -> {
                    Mono.fromRunnable(() -> {
                        mailService.sendAccountVerifyTemplate(account);
                    }).subscribeOn(Schedulers.boundedElastic()).subscribe();
                });
    }

	public Mono<AccountEntity> convertRequestToAccount() {

        return ReactiveSecurityContextHolder.getContext().map(SecurityContext::getAuthentication)
			.flatMap( auth -> {
				UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
				return accountRepository.findByEmail( userPrincipal.getId() );// .switchIfEmpty(accountRepository.findByAccountName(userPrincipal.getName()));

			} );

	}

}
