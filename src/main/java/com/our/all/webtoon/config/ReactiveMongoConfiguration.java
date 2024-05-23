package com.our.all.webtoon.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;

import com.mongodb.ConnectionString;
import com.mongodb.LoggerSettings;
import com.mongodb.MongoClientSettings;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import com.our.all.webtoon.util.properties.MongoProperties;

@Configuration
@EnableReactiveMongoRepositories(basePackages = "com.our.all.webtoon.repository")
public class ReactiveMongoConfiguration extends AbstractReactiveMongoConfiguration {

	private String databaseName = "our_all_webtoon";

	@Autowired
	private MongoProperties mongoProperties;
	
	@Override
    public MongoClient reactiveMongoClient() {
		System.out.println("kjh test  :: :  "+"mongodb+srv://%s:%s%s".formatted(mongoProperties.getUsername(), mongoProperties.getPassword(), mongoProperties.getUrl()));
		MongoClientSettings setting = MongoClientSettings.builder()
                .applicationName("our-all-webtoon")
                .applyConnectionString(//
                	new ConnectionString(//
                		"mongodb+srv://%s:%s%s".formatted(mongoProperties.getUsername(), mongoProperties.getPassword(), mongoProperties.getUrl())//
                	)//
                )
                .build();
        return MongoClients.create(setting);
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
