package com.our.all.webtoon.config.security;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class Token {
  private Long userId;
  private String token;
  private Date issuedAt;
  private Date expiresAt;
  private Boolean isDifferentIp;
  private Boolean isFirstLogin;
}
