package com.somare.assessment.infraestructure;

import com.somare.assessment.entity.Professional;
import com.somare.assessment.entity.authentication.Role;
import lombok.Data;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class ProfessionalUserDetails extends User implements UserDetails {

    @Getter
    private final Long id;

    @Getter
    private final Boolean isDisabled;

    @Getter
    private final String name;

    @Getter
    private final String email;

    @Getter
    private final String occupation;

    @Getter
    private final List<Role> authorities;

    public ProfessionalUserDetails(Professional professional) {
        super(professional.getEmail(), professional.getPassword(), professional.getProfile().getRoles());

        this.isDisabled = professional.getDisabled() != null;
        this.name = professional.getName();
        this.email = professional.getEmail();
        this.id = professional.getId();

        this.occupation = Objects.isNull(professional.getOccupation()) ? "Nenhuma ocupação" : professional.getOccupation().getName();
        this.authorities = Objects.isNull(professional.getProfile()) ? new ArrayList<>() : professional.getProfile().getRoles();
    }

    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return this.authorities
                .stream()
                .map(e -> ((GrantedAuthority) e))
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return super.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return !this.isDisabled;
    }

    @Override
    public @NotBlank String getPassword() {
        return super.getPassword();
    }
}
