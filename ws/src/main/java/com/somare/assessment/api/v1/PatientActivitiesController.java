package com.somare.assessment.api.v1;

import com.somare.assessment.entity.Activity;
import com.somare.assessment.entity.ActivityApplicationType;
import com.somare.assessment.entity.ActivityHelpType;
import com.somare.assessment.infraestructure.decorators.LikeFilterDecorator;
import com.somare.assessment.repository.ActivityApplicationTypeRepository;
import com.somare.assessment.repository.ActivityHelpTypeRepository;
import com.somare.assessment.service.ActivityService;
import com.somare.assessment.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/patient/{patientId}/activities")
public class PatientActivitiesController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private ActivityService activityService;

    @Autowired
    private ActivityApplicationTypeRepository activityApplicationTypeRepository;

    @Autowired
    private ActivityHelpTypeRepository activityHelpTypeRepository;

    @PostMapping("/")
    public ResponseEntity createActivity(@PathVariable Long patientId, @RequestBody Activity activity) {

        return ResponseEntity.ok(this.activityService.saveActivityForPatientId(patientId, activity));
    }

    @GetMapping("/")
    public ResponseEntity<Page<Activity>> listByPatientId(@PathVariable Long patientId, @PageableDefault Pageable page) {
        return ResponseEntity.ok(this.patientService.listByPatientId(patientId, page));
    }

    @PostMapping("/disable/{id}")
    public ResponseEntity disable(@PathVariable Long patientId, @PathVariable Long id) {

        this.activityService.disable(id);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/application-types")
    public ResponseEntity<Page<ActivityApplicationType>> getApplicationTypes(@RequestParam String filter, @PageableDefault Pageable page) {
        return ResponseEntity.ok(this.activityApplicationTypeRepository.findByNameLike(new LikeFilterDecorator(filter).decorate(), page));
    }

    @GetMapping("/help-types")
    public ResponseEntity<Page<ActivityHelpType>> getHelpTypes(@RequestParam String filter, @PageableDefault Pageable page) {
        return ResponseEntity.ok(this.activityHelpTypeRepository.findByNameLike(new LikeFilterDecorator(filter).decorate(), page));
    }
}
