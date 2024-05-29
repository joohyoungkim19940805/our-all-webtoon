package com.our.all.webtoon.entity.webtoon;


import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.With;


@Getter
@Setter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@With
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Document(collection = "episode")
public class EpisodeEntity {

	@Id
	private String id;

	private String webtoonId;

	private Integer chapter;

	private String title;

	private String authorMessage;

	private String[] imgaes;

	@CreatedDate
	private LocalDateTime createAt;

	@LastModifiedDate
	private LocalDateTime updateAt;
}
