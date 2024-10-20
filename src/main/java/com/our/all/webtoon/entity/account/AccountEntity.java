package com.our.all.webtoon.entity.account;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.our.all.webtoon.config.security.Role;
import com.our.all.webtoon.config.security.TokenTemplate;
import com.our.all.webtoon.util.constants.Provider;

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
public class AccountEntity implements TokenTemplate, UserDetails {

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

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String lastProviderId;

	private Provider lastProvider;
	
	@Builder.Default
	private Map<String, ProviderInfo> providerInfo = new HashMap<>();

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
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

	private List<String> termsId;

	/**
	 * 용도: 사용자의 계정이 만료되었는지 여부를 확인하는 데 사용됩니다.
	 * 설명: 이 메서드가 false를 반환하면, 사용자의 계정이 만료되었다고 간주되고, 더 이상 인증할 수 없습니다. 보통 계정의 유효 기간이 설정된 경우 이 필드를
	 * 사용하여 만료
	 * 여부를 관리합니다.
	 * 사용 시나리오: 사용자의 계정이 특정 날짜 이후 만료되도록 하거나, 유료 서비스 기간이 끝난 후 계정을 비활성화하고 싶을 때 유용합니다.
	 */
	private LocalDateTime accountNonExpiredDate;

	@Override
	public boolean isAccountNonExpired() {

		return accountNonExpiredDate == null || LocalDateTime.now()
			.isBefore( accountNonExpiredDate );

	}

	/**
	 * 용도: 사용자의 계정이 잠겨 있는지 여부를 확인하는 데 사용됩니다.
	 * 설명: 이 메서드가 false를 반환하면, 사용자의 계정이 잠긴 것으로 간주되어 로그인 시도 시 인증이 거부됩니다. 일반적으로 보안 정책에 따라 특정 횟수 이상의
	 * 로그인
	 * 실패나 관리자의 계정 잠금 설정 등에 사용됩니다.
	 * 사용 시나리오: 사용자가 여러 번 잘못된 비밀번호로 로그인 시도했을 때 계정을 잠그거나, 보안 사고 발생 시 계정을 잠금 처리하고 싶은 경우에 활용할 수 있습니다.
	 */
	private Long accountNonLockedCount;

	@Override
	public boolean isAccountNonLocked() {

		return accountNonLockedCount == null || accountNonLockedCount == 0;

	}

	/**
	 * 용도: 사용자의 자격 증명(비밀번호 등)이 만료되었는지 여부를 확인하는 데 사용됩니다.
	 * 설명: 이 메서드가 false를 반환하면, 사용자의 자격 증명(보통 비밀번호)이 만료되었다고 간주되고 인증이 거부됩니다. 주로 비밀번호 갱신 주기를 강제하거나 비밀번호
	 * 만료
	 * 정책을 구현할 때 사용됩니다.
	 * 사용 시나리오: 사용자가 일정 기간 동안 비밀번호를 변경하지 않으면 비밀번호를 갱신하도록 요구하는 경우에 유용합니다.
	 */
	private LocalDateTime credentialsNonExpiredDate;

	@Override
	public boolean isCredentialsNonExpired() {

		return credentialsNonExpiredDate == null || LocalDateTime.now()
			.isBefore( credentialsNonExpiredDate );

	}

    @Override
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public String getIssuer() {
        // TODO Auto-generated method stub
        return this.username;
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public String getSubject() {
        // TODO Auto-generated method stub
        return this.email;
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
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
	public static class ProviderInfo {

		private String email;

		private String profileImageUrl;

		private Provider provider;

		@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
		private String id;

	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() { // TODO Auto-generated method
		return null;
	}

	@Override
	public boolean isEnabled() { // TODO Auto-generated method stub

		return false;

	}

}
