package com.somare.assessment.service;

import com.somare.assessment.entity.Activity;
import com.somare.assessment.entity.Professional;
import com.somare.assessment.infraestructure.ProfessionalUserDetails;
import com.somare.assessment.infraestructure.common.service.DefaultService;
import com.somare.assessment.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Objects;

@Service
public class ActivityService extends DefaultService<Activity> {

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public Activity insert(Activity entity) {

        var user = (ProfessionalUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        entity.setOwner(new Professional(user.getId()));

        return this.repository.save(entity);
    }

    public Activity saveActivityForPatientId(Long patientId, Activity activity){

        var patient = this.patientRepository.findById(patientId);

        if(patient.isEmpty()) {
            throw new IllegalArgumentException("Patient not found");
        }

        if(Objects.isNull(activity.getPatients())){
            activity.setPatients(new HashSet<>());
        }

        if(activity.getPatients().stream().noneMatch(e -> e.getId().equals(patientId))) {
            activity.getPatients().add(patient.get());
        }


        return insert(activity);
    }
}
