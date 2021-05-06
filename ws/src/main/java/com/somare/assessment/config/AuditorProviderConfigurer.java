package com.somare.assessment.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.context.SecurityContextHolder;

import java.lang.reflect.InvocationTargetException;
import java.util.Optional;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class AuditorProviderConfigurer {

    @Bean
    public AuditorAware<Long> auditorProvider() {

        return () -> {

            var authentication = Optional
                    .ofNullable(SecurityContextHolder.getContext().getAuthentication());

            if(authentication.isEmpty()) {
                return Optional.empty();
            }

            try {
                var getIdMethod = authentication.get().getPrincipal().getClass().getMethod("getId");

                var id = (Long) getIdMethod.invoke(authentication.get().getPrincipal());
                return Optional.of(id);
            }
            catch (IllegalAccessException | NoSuchMethodException | InvocationTargetException e) {
                return Optional.empty();
            }
        };
    }
}
