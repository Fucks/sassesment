package com.somare.assessment.api.models;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TeamPatientModel {

    private Long id;

    private String name;

    public TeamPatientModel() {
    }

    public TeamPatientModel(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
