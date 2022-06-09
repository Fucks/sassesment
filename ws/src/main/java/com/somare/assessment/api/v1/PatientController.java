package com.somare.assessment.api.v1;

import com.somare.assessment.infraestructure.common.api.DefaultController;
import com.somare.assessment.entity.Patient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/patient")
public class PatientController extends DefaultController<Patient> {

}
