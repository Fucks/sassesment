package com.somare.assessment.config;

import com.somare.assessment.entity.RevisionEntity;
import org.hibernate.envers.RevisionListener;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;
import java.lang.reflect.InvocationTargetException;
import java.util.Optional;

@Configuration
public class AuditingRevisionListener implements RevisionListener {

    @PrePersist
    @PreUpdate
    @PreRemove
    @Override
    public void newRevision(Object revisionEntity) {

        final RevisionEntity auditedRevisionEntity = (RevisionEntity) revisionEntity;

        var authenticated = Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication());

        String username = "System";
        Long id = 0L;

        if (authenticated.isPresent()) {
            try {
                var usernameField = authenticated.get().getPrincipal().getClass().getDeclaredField("username");
                usernameField.setAccessible(true);

                var idField = authenticated.get().getPrincipal().getClass().getMethod("getId");

                username = (String) usernameField.get(authenticated.get().getPrincipal());
                id = (Long) idField.invoke(authenticated.get().getPrincipal());
            }
            catch (NoSuchFieldException | IllegalAccessException | NoSuchMethodException | InvocationTargetException e) {
            }
        }

        auditedRevisionEntity.setUserId(id);
        auditedRevisionEntity.setUserName(username);
    }
}

