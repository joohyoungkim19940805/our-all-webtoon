package com.our.all.webtoon.config.security;

import java.security.Principal;
import java.util.Collection;
import java.util.Map;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import lombok.ToString;

@ToString
public class UserPrincipal implements Principal, OAuth2User {
    private String id;
    private String name;

    private Map<String, Object> attributes;


    public UserPrincipal(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public UserPrincipal(
                         String id,
                         String name,
                         Map<String, Object> attributes) {
        this.id = id;
        this.name = name;
        this.attributes = attributes;
    }

    public String getId() {
        return id;
    }

    @Override
    public String getName() {
    	
        return name;
    }

    @Override
    public Map<String, Object> getAttributes() { return attributes; }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collection = null;
        return collection;

    }
}
