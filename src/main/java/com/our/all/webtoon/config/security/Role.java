package com.our.all.webtoon.config.security;

/**
 * PreAuthorize를 사용 하는 경우 ROLE_접두사가 필요
 * @author oozu1
 *
 */
public enum Role {
	ROLE_MASTER, ROLE_USER, ROLE_WRITER, ROLE_GUEST, ROLE_BOT, ROLE_APP;
}
