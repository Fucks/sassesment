package com.somare.assessment.infraestructure.authentication;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenInfoExtractor {

    public <T> T getClaim(String claim) {
        
        var auth = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return (T) auth.getClaim(claim);
    }

}
