package com.somare.assessment.entity;

import com.somare.assessment.config.DefaultConfigs;
import com.somare.assessment.infraestructure.common.entity.DefaultEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
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
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
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
}
