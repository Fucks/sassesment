package com.somare.assessment.infraestructure.listeners;

import com.somare.assessment.entity.Professional;
import com.somare.assessment.entity.owned.OwnedEntity;
import org.hibernate.envers.RevisionListener;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import javax.persistence.PrePersist;
import java.util.Optional;

@Component
public class OwnedEntityListener implements RevisionListener {

    @PrePersist
    @Override
    public void newRevision(Object revisionEntity) {

        final OwnedEntity entity = (OwnedEntity) revisionEntity;

        var authenticated = Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication());

        if (authenticated.isEmpty()) {
            throw new IllegalArgumentException("É preciso estar autenticado para executar essa ação");
        }

        try {
            var professional = new Professional((Long) ((Jwt) authenticated.get().getPrincipal()).getClaim("id"));
            entity.setProfessional(professional);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

