package com.somare.assessment.entity;

import com.somare.assessment.config.ws.DefaultConfigs;
import com.somare.assessment.entity.authentication.Profile;
import com.somare.assessment.infraestructure.common.entity.DefaultEntity;
import lombok.*;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.time.ZonedDateTime;
import java.util.List;

@Entity
@Data
@Audited
@AllArgsConstructor
@NoArgsConstructor
@Table(schema = DefaultConfigs.DEFAULT_SCHEMA)
@ToString(exclude = {"profile", "teams", "occupation"})
@EqualsAndHashCode(callSuper = true, exclude = {"profile", "teams", "occupation"})
public class Professional extends com.somare.assessment.infraestructure.common.entity.Entity implements DefaultEntity<Professional> {

    @NotBlank
    private String name;

    @NotBlank
    @Column(unique = true, updatable = false)
    private String email;

    @NotBlank
    @Column(name = "password")
    private String password;

    @ManyToOne
    private Occupation occupation;

    @ManyToOne
    private Profile profile;

    @ManyToMany(mappedBy = "professionals", fetch = FetchType.LAZY)
    private List<Team> teams;

    private ZonedDateTime disabled;

    public void update(@Valid Professional professional) {
        this.name = professional.name;
        this.occupation = professional.occupation;
        this.email = professional.email;
        this.profile = professional.profile;
    }

    public Professional(Long id) {
        super(id);
    }

    public Professional(Professional professional) {
        super(professional.id);
        this.disabled = professional.disabled;
        this.profile = professional.profile;
        this.name = professional.name;
        this.password = professional.password;
        this.occupation = professional.occupation;
    }

    public Professional(Long id, String name) {
        super(id);
        this.name = name;
    }
}
