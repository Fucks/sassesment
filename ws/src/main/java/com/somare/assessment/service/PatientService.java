package com.somare.assessment.service;

import com.somare.assessment.entity.Patient;
import com.somare.assessment.entity.Team;
import com.somare.assessment.entity.authentication.Role;
import com.somare.assessment.infraestructure.common.service.DefaultService;
import com.somare.assessment.infraestructure.ProfessionalUserDetails;
import com.somare.assessment.repository.PatientRepository;
import com.somare.assessment.repository.ProfessionalRepository;
import com.somare.assessment.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class PatientService extends DefaultService<Patient> {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private ProfessionalRepository professionalRepository;

    @Override
    public Page<Patient> list(String filter, Pageable page) {

        var user = SecurityContextHolder.getContext().getAuthentication();

        if (isUserAuthorizedToViewAllPatients(user)) {
            return this.patientRepository.findAll(page);
        }

        var professional = this.professionalRepository.findByIdWithTeams(((ProfessionalUserDetails) user.getPrincipal()).getId());

        var teamIds = professional.getTeams().stream().map(Team::getId).collect(Collectors.toList());

        if (teamIds.isEmpty()) {
            return this.patientRepository.findAll(page);
        }

        return this.patientRepository.findAllByTeams_IdIn(teamIds, page);
    }

    private boolean isUserAuthorizedToViewAllPatients(Authentication user) {
        return user
                .getAuthorities()
                .stream()
                .anyMatch(e -> e.getAuthority().equals(Role.ROLE_VIEW_ALL_PATIENT));
    }
}
