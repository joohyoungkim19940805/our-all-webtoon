package com.our.all.webtoon.repository.account;

import com.our.all.webtoon.entity.account.AccountLogEntity;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;
public interface AccountLogRepository extends ReactiveCrudRepository<AccountLogEntity, Long> {
    Mono<Boolean> existsByIp(String ip);
}