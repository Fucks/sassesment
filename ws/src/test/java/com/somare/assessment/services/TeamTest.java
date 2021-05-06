package com.somare.assessment.services;


import com.somare.assessment.AssessmentApplication;
import com.somare.assessment.entity.Patient;
import com.somare.assessment.entity.Professional;
import com.somare.assessment.entity.Team;
import com.somare.assessment.service.PatientService;
import com.somare.assessment.service.ProfessionalService;
import com.somare.assessment.service.TeamService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.util.Assert;

import java.time.LocalDate;

@AutoConfigureMockMvc
@SpringBootTest(classes = AssessmentApplication.class)
public class TeamTest {

    @Autowired
    private TeamService teamService;

    @Autowired
    private ProfessionalService professionalService;

    @Autowired
    private PatientService patientService;

    @Test
    public void createTeamWithoutMembersWithSuccess() {
        var team = new Team();
        team.setName("Equipe A");

        team = teamService.insert(team);

        Assert.notNull(team.getId(), "O id deve ser obtido automaticamente");

        Page<Team> page = teamService.list(PageRequest.of(0, 1));

        Assert.notEmpty(page.getContent(), "Deve existir pelo menos 1 equipe cadastrada");
    }

    @Test
    public void appendProfessionalOnTeamWithSuccess() {

        var team = new Team();
        team.setName("Equipe A");

        team = teamService.insert(team);

        Assert.isNull(team.getProfessionals(), "Não deve existir nenhum profissional no time");

        var professional = new Professional();
        professional.setName("Prof 1");
        professional.setPassword("123456");
        professional.setEmail("prof1@teste");

        professional = professionalService.insert(professional);

        team.addProfessional(professional);

        team = teamService.update(team.getId(), team);

        Team dbTeam = teamService.getByIdWithMembers(team.getId());

        Assert.notNull(dbTeam.getProfessionals(), "Deve existir profissionais salvos na equipe");
        Assert.isTrue(dbTeam.getProfessionals().size() == 1, "Deve existir 1 profissional na equipe");

    }

    @Test
    public void appendPatientOnTeamWithSuccess() {

        var team = new Team();
        team.setName("Equipe A");

        team = teamService.insert(team);

        Assert.isNull(team.getProfessionals(), "Não deve existir nenhuma equipe no time");

        var patient = new Patient();
        patient.setName("Paciente 1");
        patient.setBirthDate(LocalDate.now());

        patient = patientService.insert(patient);

        team.addPatient(patient);

        team = teamService.update(team.getId(), team);

        Team dbTeam = teamService.getByIdWithMembers(team.getId());

        Assert.notNull(dbTeam.getPatients(), "Deve existir pacientes salvos na equipe");
        Assert.isTrue(dbTeam.getPatients().size() == 1, "Deve existir 1 paciente na equipe");

    }

    @Test
    public void disableTeamWithSuccess() {
        var team = new Team();
        team.setName("Disabled team");

        final var dbTeam = this.teamService.insert(team);

        this.teamService.disable(dbTeam);

        Assert.isTrue(this.teamService.list(PageRequest.of(0, 99)).get().noneMatch(e -> e.getId().equals(dbTeam.getId())), "A equipe desabilitada nao deve ser listada");

    }
}
