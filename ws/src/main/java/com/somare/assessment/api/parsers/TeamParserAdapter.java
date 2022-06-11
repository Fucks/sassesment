package com.somare.assessment.api.parsers;

import com.somare.assessment.api.models.TeamModel;
import com.somare.assessment.api.models.TeamPatientModel;
import com.somare.assessment.api.models.TeamProfessionalModel;
import com.somare.assessment.entity.Patient;
import com.somare.assessment.entity.Professional;
import com.somare.assessment.entity.Team;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class TeamParserAdapter implements ModelToEntityParserAdapter<Team, TeamModel> {

    @Override
    public Team serializeToEntity(TeamModel model) {

        Set<Professional> professionals = model.getProfessionals()
                .stream()
                .map(prof -> new Professional(prof.getId(), prof.getName()))
                .collect(Collectors.toSet());

        Set<Patient> patients = model.getPatients()
                .stream()
                .map(pat -> new Patient(pat.getId(), pat.getName()))
                .collect(Collectors.toSet());


        return new Team(model.getId(), model.getName(), professionals, patients);
    }

    @Override
    public TeamModel serializeToModel(Team entity) {
        return TeamModel
                .builder()
                .id(entity.getId())
                .name(entity.getName())
                .professionals(
                        entity
                                .getProfessionals()
                                .stream()
                                .map(professional -> TeamProfessionalModel
                                        .builder()
                                        .id(professional.getId())
                                        .name(professional.getName())
                                        .build()
                                )
                                .collect(Collectors.toList())
                )
                .patients(
                        entity
                                .getPatients()
                                .stream()
                                .map(patient -> TeamPatientModel
                                        .builder()
                                        .id(patient.getId())
                                        .name(patient.getName())
                                        .build()
                                )
                                .collect(Collectors.toList())
                )
                .build();
    }
}
