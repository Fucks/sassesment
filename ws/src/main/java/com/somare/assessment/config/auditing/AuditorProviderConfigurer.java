package com.somare.assessment.config.auditing;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

import java.lang.reflect.InvocationTargetException;
import java.util.Optional;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider", dateTimeProviderRef = "zonedDateTimeProvider")
public class AuditorProviderConfigurer {

    @Bean
    public AuditorAware<Long> auditorProvider() {

        return () -> {

            var authentication = Optional
                    .ofNullable(SecurityContextHolder.getContext().getAuthentication());

            if (authentication.isEmpty()) {
                return Optional.empty();
            }

            try {
                var id = (Long) ((Jwt) authentication.get().getPrincipal()).getClaim("id");
                return Optional.of(id);
            } catch (Exception e) {
                e.printStackTrace();
                return Optional.empty();
            }
        };
    }
}
