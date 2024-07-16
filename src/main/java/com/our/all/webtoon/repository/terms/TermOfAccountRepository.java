package com.our.all.webtoon.repository.terms;


import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import com.our.all.webtoon.entity.terms.TermsOfAccountEntity;


public interface TermOfAccountRepository extends ReactiveMongoRepository<TermsOfAccountEntity, String> {

}
