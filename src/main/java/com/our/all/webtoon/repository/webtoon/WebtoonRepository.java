package com.our.all.webtoon.repository.webtoon;


import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import com.our.all.webtoon.entity.webtoon.WebtoonEntity;


public interface WebtoonRepository extends ReactiveMongoRepository<WebtoonEntity, String> {


}
