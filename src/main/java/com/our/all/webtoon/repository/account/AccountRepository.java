package com.our.all.webtoon.repository.account;


import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import com.our.all.webtoon.entity.account.AccountEntity;
import reactor.core.publisher.Mono;


public interface AccountRepository extends ReactiveMongoRepository<AccountEntity, String> {

    Mono<AccountEntity> findByAccountName(String accountName);

    Mono<AccountEntity> findByEmail(String email);

    Mono<AccountEntity> findByAccountNameAndEmail(String accountName, String email);

    Mono<AccountEntity> findByProviderId(String providerId);

	Mono<AccountEntity> findByToken(String token);
}
