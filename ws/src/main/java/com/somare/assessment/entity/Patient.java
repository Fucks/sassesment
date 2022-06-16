package com.somare.assessment.entity;

import com.somare.assessment.config.DefaultConfigs;
import com.somare.assessment.infraestructure.common.entity.DefaultEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.envers.Audited;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Data
@Audited
@Entity
@Table(schema = DefaultConfigs.DEFAULT_SCHEMA)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true, exclude = {"teams"})
public class Patient extends com.somare.assessment.infraestructure.common.entity.Entity implements DefaultEntity<Patient> {

    @NotBlank
    private String name;

    @NotNull
    private LocalDate birthDate;


    @ManyToMany(mappedBy = "patients", fetch = FetchType.LAZY)
    private List<Team> teams;

    public void update(Patient patient){
        this.name = patient.name;
        this.birthDate = patient.birthDate;
    }

    public Patient(Long id, String name) {
        super(id);
        this.name = name;
    }

    public Patient(Long id, String name, LocalDate birthDate) {
        super(id);
        this.name = name;
        this.birthDate = birthDate;
    }
}
