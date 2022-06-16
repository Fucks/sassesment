package com.somare.assessment.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.somare.assessment.config.DefaultConfigs;
import com.somare.assessment.infraestructure.common.entity.DefaultEntity;
import lombok.*;
import org.hibernate.envers.Audited;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Data
@Entity
@Audited
@Table(schema = DefaultConfigs.DEFAULT_SCHEMA)
@EqualsAndHashCode(callSuper = true, exclude = {"patients", "professionals"})
@JsonIdentityInfo(generator = ObjectIdGenerators.StringIdGenerator.class)
public class Team extends com.somare.assessment.infraestructure.common.entity.Entity implements DefaultEntity<Team> {

    @NotBlank
    private String name;

    @ManyToMany
    private Set<Professional> professionals;

    @ManyToMany
    private Set<Patient> patients;

    public void addProfessional(@NotNull Professional professional) {

        if(Objects.isNull(this.professionals)) {
            this.professionals = new HashSet<>();
        }

        this.professionals.add(professional);
    }

    public void addPatient(@NotNull Patient patient) {

        if(Objects.isNull(this.patients)) {
            this.patients = new HashSet<>();
        }

        this.patients.add(patient);
    }

    @Override
    public void update(Team entity) {
        this.name = entity.name;
        this.professionals = entity.professionals;
        this.patients = entity.patients;
    }

    public Team(Long id, String name, Set<Professional> professionals, Set<Patient> patients) {
        super(id);
        this.name = name;
        this.professionals = professionals;
        this.patients = patients;
    }

    public Team() {
    }
}
