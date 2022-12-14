package com.somare.assessment.entity.authentication;

import com.somare.assessment.infraestructure.common.entity.DefaultEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@Audited
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Profile extends com.somare.assessment.infraestructure.common.entity.Entity implements DefaultEntity<Profile> {

    private String name;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.REMOVE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(name = "profile_role",
            joinColumns = @JoinColumn(name = "profile_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;

    @Override
    public void update(Profile entity) {
        this.name = entity.name;
        this.roles = entity.roles;
    }
}
