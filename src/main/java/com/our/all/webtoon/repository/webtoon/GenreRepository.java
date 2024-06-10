package com.our.all.webtoon.repository.webtoon;


import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import com.our.all.webtoon.entity.webtoon.GenreEntity;
import reactor.core.publisher.Mono;


public interface GenreRepository extends ReactiveMongoRepository<GenreEntity, String> {

	Mono<Boolean> existsByName(
		String name
	);
}
