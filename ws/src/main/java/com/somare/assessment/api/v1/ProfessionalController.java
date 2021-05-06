package com.somare.assessment.api.v1;

import com.somare.assessment.infraestructure.common.api.DefaultController;
import com.somare.assessment.entity.Professional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/professional")
public class ProfessionalController extends DefaultController<Professional> {
}
