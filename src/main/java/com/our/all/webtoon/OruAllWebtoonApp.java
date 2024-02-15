package com.our.all.webtoon;

import java.lang.annotation.Annotation;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Transient;
import org.springframework.data.r2dbc.config.EnableR2dbcAuditing;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.our.all.webtoon.AutoDbMappingGenerater.AutoDbMappingGeneraterOption;
import com.our.all.webtoon.AutoDbMappingGenerater.ColumnEntry;
import com.our.all.webtoon.AutoDbMappingGenerater.UnderType;

import io.r2dbc.postgresql.codec.Json;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.With;
import spoon.Launcher;
import spoon.reflect.declaration.CtAnnotation;
import spoon.reflect.declaration.CtAnnotationType;
import spoon.reflect.declaration.CtField;
import spoon.reflect.declaration.CtMethod;
import spoon.reflect.declaration.ModifierKind;
import spoon.reflect.reference.CtTypeReference;

//import com.hide_and_fps.project.repository.testRepository;

/*
 * 이 클래스의 패키지가 최상위 루트로 지정된다.
 */

@ComponentScan(basePackages = {
		"com.our.all.webtoon.*"
})
@SpringBootApplication
@EnableR2dbcAuditing
public class OruAllWebtoonApp {
	public static void main(String[] args) {
		System.setProperty("jasypt.encryptor.password", System.getenv("MY_SERVER_PASSWORD"));
		System.setProperty("tinylog.configurationloader", "com.our.all.webtoon.util.PropertiesConfigurationLoader");

		SpringApplication.run(OruAllWebtoonApp.class, args);

	}
}
