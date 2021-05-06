package com.somare.assessment.service;

import com.somare.assessment.entity.Team;
import com.somare.assessment.infraestructure.common.service.DefaultService;
import com.somare.assessment.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeamService extends DefaultService<Team> {

    @Autowired
    private TeamRepository teamRepository;

    public Team getByIdWithMembers(Long id) {
        return this.teamRepository.getByIdWithMembers(id);
    }
}
