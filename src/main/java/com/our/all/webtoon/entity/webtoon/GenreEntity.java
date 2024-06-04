package com.our.all.webtoon.entity.webtoon;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.our.all.webtoon.config.security.Role;
import com.our.all.webtoon.entity.account.AccountEntity;
import com.our.all.webtoon.entity.account.AccountEntity.GoogleProviderInfo;
import com.our.all.webtoon.util.constants.ProviderAccount;
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
@Document(collection = "account")
public class GenreEntity {

	@Id
	private String id;
	private String name;
	private LocalDateTime createdAt;
	
}
