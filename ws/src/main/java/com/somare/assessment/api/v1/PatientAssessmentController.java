package com.somare.assessment.api.v1;

import com.somare.assessment.entity.Activity;
import com.somare.assessment.entity.Assessment;
import com.somare.assessment.service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/api/v1/patient/{patientId}/assessment")
public class PatientAssessmentController {

    @Autowired
    private AssessmentService assessmentService;

    @PostMapping
    public ResponseEntity<Assessment> createAssessment(@RequestBody @Valid Assessment assessment) {
        var response = assessmentService.create(assessment);
        return ResponseEntity.ok(response);
    }

    @PutMapping
    public ResponseEntity<Assessment> updateAssessment(@RequestBody @Valid Assessment assessment) {
        var response = assessmentService.update(assessment);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/finish")
    public ResponseEntity<Assessment> finishAssessment(@RequestBody @Valid Assessment assessment) {
        var response = this.assessmentService.finishAssessment(assessment);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/list")
    public ResponseEntity<Page<Assessment>> listByPatientId(@PathVariable Long patientId, @PageableDefault Pageable page) {
        return ResponseEntity
                .ok(this.assessmentService.listByPatientId(patientId, page));
    }

}
