package com.our.all.webtoon.config.security;

import java.util.List;

public interface TokenTemplate {

	String getIssuer();
	
	String getSubject();
	
	String getName();
	
	List<Role> getRoles();
}
