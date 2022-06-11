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

}
