package com.our.all.webtoon.entity.account;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.our.all.webtoon.config.security.Role;
import com.our.all.webtoon.config.security.TokenTemplate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.With;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@With
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Document(collection="account")
public class AccountEntity implements TokenTemplate {
    @Id
    private String accountId;
    
    private String accountName;
    
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String nickname;
    
    private Boolean isEnabled;

    private List<Role> roles;

    private String firstName;
    
    private String lastName;
    
    private String email;

    private String profileImage;
    
    @CreatedDate
    private LocalDateTime createAt;

    @LastModifiedDate
    private LocalDateTime updateAt;

    @Override
    public String getIssuer() {
        // TODO Auto-generated method stub
        return this.accountName;
    }

    @Override
    public String getSubject() {
        // TODO Auto-generated method stub
        return this.email;
    }

    @Override
    public String getName() {
        // TODO Auto-generated method stub
        return this.firstName + this.lastName;
    }
    
}