package com.somare.assessment.service;

import com.somare.assessment.entity.Activity;
import com.somare.assessment.entity.Patient;
import com.somare.assessment.entity.Team;
import com.somare.assessment.entity.authentication.Role;
import com.somare.assessment.infraestructure.authentication.JwtTokenInfoExtractor;
import com.somare.assessment.infraestructure.common.service.DefaultService;
import com.somare.assessment.repository.ActivityRepository;
import com.somare.assessment.repository.PatientRepository;
import com.somare.assessment.repository.ProfessionalRepository;
import com.somare.assessment.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientService extends DefaultService<Patient> {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private ProfessionalRepository professionalRepository;

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private JwtTokenInfoExtractor tokenInfoExtractor;

    @Override
    public Page<Patient> list(String filter, Pageable page) {

        if (isUserAuthorizedToViewAllPatients()) {
            return this.patientRepository.findByNameLikeIgnoreCaseAndDisabledIsNull(filter, page);
        }

        var professional = this.professionalRepository.findByIdWithTeams(tokenInfoExtractor.<Long>getClaim("id"));

        var teamIds = professional.getTeams().stream().map(Team::getId).collect(Collectors.toList());

        if (teamIds.isEmpty()) {
            return this.patientRepository.findByNameLikeIgnoreCaseAndDisabledIsNull(filter, page);
        }

        return this.patientRepository.findByTeams_IdInAndNameLikeIgnoreCaseAndDisabledIsNull(teamIds, filter, page);
    }

    public Page<Activity> listByPatientId(Long patientId, Pageable page) {

        if (isUserAuthorizedToViewAllPatients()) {
            return this.activityRepository.findAllByPatients_Id(patientId, page);
        }

        return this.activityRepository.findAllByProfessional_IdAndPatients_Id(tokenInfoExtractor.<Long>getClaim("id"), patientId, page);
    }

    public List<Team> getPatientTeams(Long id) {
        return teamRepository.findByPatients_IdAndDisabledIsNull(id);
    }

    private boolean isUserAuthorizedToViewAllPatients() {
        return tokenInfoExtractor.<List<String>>getClaim("authorities")
                .stream()
                .anyMatch(e -> e.equals(Role.ROLE_VIEW_ALL_PATIENT));
    }
}
