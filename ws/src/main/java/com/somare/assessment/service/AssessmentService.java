package com.somare.assessment.service;

import com.somare.assessment.entity.Assessment;
import com.somare.assessment.infraestructure.exceptions.bussiness.AssessmentNotFoundException;
import com.somare.assessment.repository.AssessmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.Objects;

@Service
public class AssessmentService {

    @Autowired
    private AssessmentRepository repository;

    public Assessment create(Assessment assessment) {
        return this.repository.saveAndFlush(assessment);
    }

    @Transactional(readOnly = true)
    public Assessment update(Assessment assessment) throws AssessmentNotFoundException {

        if (Objects.isNull(assessment.getId())) {
            throw new AssessmentNotFoundException();
        }

        var hasAssessment = this.repository.findById(assessment.getId());

        if (hasAssessment.isEmpty()) {
            throw new AssessmentNotFoundException();
        }

        var dbAssessment = hasAssessment.get();

        dbAssessment.update(assessment);

        this.repository.saveAndFlush(dbAssessment);

        return assessment;
    }

    public Assessment finishAssessment(Assessment assessment) throws AssessmentNotFoundException {

        if (Objects.isNull(assessment.getId())) {
            assessment.setEndDate(ZonedDateTime.now());
            return this.repository.saveAndFlush(assessment);
        }

        var hasAssessment = this.repository.findById(assessment.getId());

        if (hasAssessment.isEmpty()) {
            throw new AssessmentNotFoundException();
        }

        var dbAssessment = hasAssessment.get();

        dbAssessment.update(assessment);
        dbAssessment.finish();
        assessment.finish();

        this.repository.saveAndFlush(dbAssessment);

        return assessment;
    }

    public Page<Assessment> listByPatientId(Long patientId, Pageable page) {
        return this.repository.findByPatient_IdOrderByStartDateDesc(patientId, page);
    }

}
