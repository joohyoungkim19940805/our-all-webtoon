package com.our.all.webtoon.entity.webtoon;


import java.util.List;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.our.all.webtoon.dto.Editor;
import com.our.all.webtoon.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.With;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@With
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Document(collection = "webtoon")
public class WebtoonEntity extends BaseEntity {

	private String title;

	private List<Editor> synopsis;

	private String accountId;

	private List<String> genre;

	private String thumbnail;
}
