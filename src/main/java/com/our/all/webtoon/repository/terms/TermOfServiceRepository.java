package com.our.all.webtoon.repository.terms;


import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import com.our.all.webtoon.entity.terms.TermsOfServiceEntity;
import com.our.all.webtoon.entity.terms.code.TermsOfServiceNames;
import reactor.core.publisher.Mono;


public interface TermOfServiceRepository extends ReactiveMongoRepository<TermsOfServiceEntity, String> {

	Mono<Boolean> existsByTermsOfServiceName(
		TermsOfServiceNames termsOfServiceName
	);

	Mono<TermsOfServiceEntity> findByName(
		String name
	);
	
	Mono<TermsOfServiceEntity> findByTermsOfServiceName(
		TermsOfServiceNames termsOfServiceName
	);

}
