package com.our.all.webtoon.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;

import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;

@Configuration
@EnableReactiveMongoRepositories(basePackages = "com.our.all.webtoon.repository")
public class ReactiveMongoConfiguration extends AbstractReactiveMongoConfiguration {

	private String databaseName = "our_all_webtoon";
	
	@Override
    public MongoClient reactiveMongoClient() {
        return MongoClients.create("mongodb+srv://application:3pv58lNGspSpaDkv@our-all-webtoon.kjxfgr6.mongodb.net/?retryWrites=true&w=majority");
    }
    @Bean
    public ReactiveMongoTemplate reactiveMongoTemplate() {
        return new ReactiveMongoTemplate(reactiveMongoClient(), getDatabaseName());
    }
    @Override
    protected String getDatabaseName() {
        return databaseName;
    }
}
