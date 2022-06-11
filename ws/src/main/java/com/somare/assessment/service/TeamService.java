package com.somare.assessment.service;

import com.somare.assessment.entity.Patient;
import com.somare.assessment.entity.Team;
import com.somare.assessment.infraestructure.common.service.DefaultService;
import com.somare.assessment.repository.PatientRepository;
import com.somare.assessment.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TeamService extends DefaultService<Team> {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private PatientRepository patientRepository;

    public Team getByIdWithMembers(Long id) {
        return this.teamRepository.getByIdWithMembers(id);
    }

    public Page<Team> getTeamsNotAttachedToPatient(Long patientId, String filter, Pageable page) {
        return this.teamRepository.findDistinctByPatients_IdNotAndNameLikeAndDisabledIsNull(patientId, filter, page);
    }

    public Team addPatientIdToTeamId(Long teamId, Long patientId) {

        Optional<Team> hasTeam = teamRepository.findById(teamId);

        if (hasTeam.isEmpty()) {
            throw new IllegalArgumentException("Equipe não encontrada");
        }

        Optional<Patient> hasPatient = patientRepository.findById(patientId);

        if (hasPatient.isEmpty()) {
            throw new IllegalArgumentException("Paciente não encontrado");
        }

        var team = hasTeam
                .get();

        team.addPatient(hasPatient.get());

        return this.teamRepository.saveAndFlush(team);
    }
}
