package com.somare.assessment.api.models;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TeamModel {

    private Long id;

    private String name;

    private List<TeamProfessionalModel> professionals;

    private List<TeamPatientModel> patients;

    public TeamModel() {
    }

    public TeamModel(Long id, String name, List<TeamProfessionalModel> professionals, List<TeamPatientModel> patients) {
        this.id = id;
        this.name = name;
        this.professionals = professionals;
        this.patients = patients;
    }
}
