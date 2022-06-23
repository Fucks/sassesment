package com.somare.assessment.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/oauth/userinfo")
public class OAuthUserInfoController {

    @GetMapping("/check-token")
    public ResponseEntity checkToken() {
        return ResponseEntity.ok().build();
    }

}
