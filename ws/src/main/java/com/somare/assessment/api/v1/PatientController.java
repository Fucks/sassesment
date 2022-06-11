package com.somare.assessment.api.v1;

import com.somare.assessment.api.models.PatientModel;
import com.somare.assessment.api.parsers.TeamParserAdapter;
import com.somare.assessment.entity.Patient;
import com.somare.assessment.infraestructure.common.api.SimpleEntityModelController;
import com.somare.assessment.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/patient")
public class PatientController extends SimpleEntityModelController<Patient, PatientModel> {

    @Autowired
    private PatientService patientService;

    @Autowired
    private TeamParserAdapter teamParserAdapter;

    @GetMapping("/{id}/teams")
    public ResponseEntity getTeamsByPatientId(@PathVariable Long id) {

        var response = this.patientService.getPatientTeams(id).stream().map(teamParserAdapter::serializeToModel);

        return ResponseEntity
                .ok(response);
    }
}
