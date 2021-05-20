package com.somare.assessment.api;

import com.somare.assessment.infraestructure.ProfessionalUserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/oauth/userinfo")
public class OAuthUserInfoController {

    @GetMapping
    public ResponseEntity<ProfessionalUserDetails> getAuthenticated() {

        var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return ResponseEntity.ok((ProfessionalUserDetails) principal);
    }

    @GetMapping("/check-token")
    public ResponseEntity checkToken() {
        return ResponseEntity.ok().build();
    }

}
