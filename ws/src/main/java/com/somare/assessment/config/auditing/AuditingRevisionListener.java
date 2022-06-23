package com.somare.assessment.config.auditing;

import com.somare.assessment.entity.RevisionEntity;
import org.hibernate.envers.RevisionListener;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;
import java.util.Optional;

@Component
public class AuditingRevisionListener implements RevisionListener {

    @PrePersist
    @PreUpdate
    @PreRemove
    @Override
    public void newRevision(Object revisionEntity) {

        final RevisionEntity auditedRevisionEntity = (RevisionEntity) revisionEntity;

        var authenticated = Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication());

        String username = "System";

        if (authenticated.isPresent()) {
            try {
                username = ((Jwt) authenticated.get().getPrincipal()).getSubject();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        auditedRevisionEntity.setUserName(username);
    }
}

