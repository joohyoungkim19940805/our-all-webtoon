package com.our.all.webtoon.entity.account;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.our.all.webtoon.config.security.Role;
import com.our.all.webtoon.config.security.TokenTemplate;
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
public class AccountEntity implements TokenTemplate {

    @Id
    private String id;

    private String deviceId;

    private String accountName;

    private Integer age;

    private LocalDateTime createdAt;

    private String email;

    private String gender;

    private Boolean isEnabled;

    private String nickname;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String profileImage;

    private String providerId;

	private ProviderAccount lastProvider;

    private List<Role> roles;

    private String username;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String token;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String refreshToken;

    @CreatedDate
    private LocalDateTime createAt;

    @LastModifiedDate
    private LocalDateTime updateAt;

	private GoogleProviderInfo googleProviderInfo;

    @Override
    public String getIssuer() {
        // TODO Auto-generated method stub
        return this.username;
    }

    @Override
    public String getSubject() {
        // TODO Auto-generated method stub
        return this.email;
    }

    @Override
    public String getName() {
        // TODO Auto-generated method stub
        return this.username;
    }

	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
    @Builder
    @With
	public static class GoogleProviderInfo {

		private String email;

		private String profileImageUrl;

		private String id;
    }

}
