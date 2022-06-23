package com.somare.assessment.api.v1;

import com.somare.assessment.infraestructure.authentication.JwtTokenGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TokenController {

    @Autowired
    private JwtTokenGenerator jwtTokenGenerator;

    @PostMapping("/token")
    public String postFormLogin() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof JwtAuthenticationToken) {
            return ((JwtAuthenticationToken) authentication).getToken().getTokenValue();
        }

        return jwtTokenGenerator.generateToken(authentication);
    }

}
