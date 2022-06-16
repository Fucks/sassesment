package com.somare.assessment.api.models;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TeamProfessionalModel {

    private Long id;

    private String name;

    public TeamProfessionalModel() {
    }

    public TeamProfessionalModel(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
