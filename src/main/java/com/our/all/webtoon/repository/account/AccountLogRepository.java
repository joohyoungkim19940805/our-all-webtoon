package com.our.all.webtoon.repository.account;

import com.our.all.webtoon.entity.account.AccountLogEntity;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;
public interface AccountLogRepository extends ReactiveMongoRepository<AccountLogEntity, Long> {
    Mono<Boolean> existsByIp(String ip);
}