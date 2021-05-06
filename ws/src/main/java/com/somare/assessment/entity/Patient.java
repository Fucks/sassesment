package com.somare.assessment.entity;

import com.somare.assessment.config.DefaultConfigs;
import com.somare.assessment.infraestructure.common.entity.DefaultEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Table(schema = DefaultConfigs.DEFAULT_SCHEMA)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Patient extends com.somare.assessment.infraestructure.common.entity.Entity implements DefaultEntity<Patient> {

    @NotBlank
    private String name;

    @NotNull
    private LocalDate birthDate;

    @ManyToMany(mappedBy = "patients")
    private List<Team> teams;

    public void update(Patient patient){
        this.name = patient.name;
        this.birthDate = patient.birthDate;
    }
}
