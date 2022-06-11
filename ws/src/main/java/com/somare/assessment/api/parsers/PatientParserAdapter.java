package com.somare.assessment.api.parsers;

import com.somare.assessment.api.models.PatientModel;
import com.somare.assessment.entity.Patient;
import org.springframework.stereotype.Component;

@Component
public class PatientParserAdapter implements ModelToEntityParserAdapter<Patient, PatientModel> {

    @Override
    public Patient serializeToEntity(PatientModel model) {
        return new Patient(model.getId(), model.getName(), model.getBirthDate());
    }

    @Override
    public PatientModel serializeToModel(Patient entity) {
        return PatientModel.builder()
                .id(entity.getId())
                .name(entity.getName())
                .birthDate(entity.getBirthDate())
                .build();
    }
}
