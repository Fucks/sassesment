package com.somare.assessment.api.v1;

import com.somare.assessment.api.models.TeamModel;
import com.somare.assessment.api.parsers.TeamParserAdapter;
import com.somare.assessment.infraestructure.common.api.DefaultController;
import com.somare.assessment.entity.Team;
import com.somare.assessment.infraestructure.common.api.SimpleEntityModelController;
import com.somare.assessment.infraestructure.decorators.LikeFilterDecorator;
import com.somare.assessment.service.PatientService;
import com.somare.assessment.service.ProfessionalService;
import com.somare.assessment.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/teams")
public class TeamController extends SimpleEntityModelController<Team, TeamModel> {

    @Autowired
    private TeamService teamService;

    @Autowired
    private TeamParserAdapter parserAdapter;

    @PostMapping("/{id}/patient/{patientId}")
    public ResponseEntity attachPatientToTeam(@PathVariable Long id, @PathVariable Long patientId) {

        var result = this.teamService.addPatientIdToTeamId(id, patientId);

        return ResponseEntity
                .ok(parserAdapter.serializeToModel(result));
    }

    @GetMapping("/patients/{id}/filter-not-in")
    public ResponseEntity findTeamsNotAttachedToPatient(@RequestParam String filter, @PathVariable Long id, @PageableDefault Pageable page) {

        return ResponseEntity
                .ok(this.teamService.getTeamsNotAttachedToPatient(id, new LikeFilterDecorator(filter).decorate(), page).map(parserAdapter::serializeToModel));
    }
}
