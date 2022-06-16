package com.somare.assessment.api.models;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Builder
@Data
public class PatientModel {

    private Long id;

    private String name;

    private LocalDate birthDate;

    public PatientModel() {
    }

    public PatientModel(Long id, String name, LocalDate birthDate) {
        this.id = id;
        this.name = name;
        this.birthDate = birthDate;
    }
}
