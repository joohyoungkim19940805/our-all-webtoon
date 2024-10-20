package com.our.all.webtoon.repository.account;


import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.our.all.webtoon.entity.account.AccountEntity;
import com.our.all.webtoon.entity.account.AccountEntity.ProviderInfo;

import reactor.core.publisher.Mono;


public interface AccountRepository extends ReactiveMongoRepository<AccountEntity, String> {

    Mono<AccountEntity> findByAccountName(String accountName);

    Mono<AccountEntity> findByEmail(String email);

    Mono<AccountEntity> findByAccountNameAndEmail(String accountName, String email);

    Mono<AccountEntity> findByProviderInfo(ProviderInfo googleProviderInfo);

    Mono<AccountEntity> findByToken(String token);
    
    Mono<AccountEntity> findByLastProviderId(
		String lastProviderId
	);
}
