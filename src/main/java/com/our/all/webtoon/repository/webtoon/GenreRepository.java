package com.our.all.webtoon.repository.webtoon;


import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import com.our.all.webtoon.entity.webtoon.GenreEntity;


public interface GenreRepository extends ReactiveMongoRepository<GenreEntity, String> {

}
