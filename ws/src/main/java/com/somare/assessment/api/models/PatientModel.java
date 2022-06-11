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

}
