package com.somare.assessment.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.somare.assessment.config.DefaultConfigs;
import com.somare.assessment.entity.authentication.Profile;
import com.somare.assessment.infraestructure.common.entity.DefaultEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(schema = DefaultConfigs.DEFAULT_SCHEMA)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Professional extends com.somare.assessment.infraestructure.common.entity.Entity implements DefaultEntity<Professional> {

    @NotBlank
    private String name;

    @NotBlank
    @Column(unique = true)
    private String email;

    @NotBlank
    @Column(name = "password")
    private String password;

    @ManyToOne
    private Occupation occupation;

    @ManyToOne
    private Profile profile;

    @ManyToMany(mappedBy = "professionals")
    private List<Team> teams;

    private LocalDateTime disabled;

    public void update(@Valid Professional professional) {
        this.name = professional.name;
        this.occupation = professional.occupation;
        this.email = professional.email;
        this.profile = professional.profile;
    }

    public Professional(Long id){
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
}
