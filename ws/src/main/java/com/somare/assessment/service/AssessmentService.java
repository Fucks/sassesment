package com.somare.assessment.service;

import com.somare.assessment.entity.Assessment;
import com.somare.assessment.repository.AssessmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class AssessmentService {

    @Autowired
    private AssessmentRepository repository;

    public Assessment create(Assessment assessment) {
        return this.repository.saveAndFlush(assessment);
    }

    public Page<Assessment> listByPatientId(Long patientId, Pageable page) {
        return this.repository.findByPatient_IdOrderByStartDateDesc(patientId, page);
    }

}
