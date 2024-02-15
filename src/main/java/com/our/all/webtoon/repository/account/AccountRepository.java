package com.our.all.webtoon.repository.account;

import com.our.all.webtoon.entity.account.AccountEntity;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;
public interface AccountRepository extends ReactiveMongoRepository<AccountEntity, Long> {
    Mono<AccountEntity> findByAccountName(String accountName);

    Mono<AccountEntity> findByEmail(String email);

    Mono<AccountEntity> findByAccountNameAndEmail(String accountName, String email);
    
}