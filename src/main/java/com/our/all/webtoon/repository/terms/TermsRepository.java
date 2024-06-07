package com.our.all.webtoon.repository.terms;


import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import com.our.all.webtoon.entity.terms.TermsEntity;
import reactor.core.publisher.Mono;


public interface TermsRepository extends ReactiveMongoRepository<TermsEntity, String> {

	Mono<Boolean> existsByName(
		String name
	);

	Mono<TermsEntity> findByName(
		String name
	);
}
