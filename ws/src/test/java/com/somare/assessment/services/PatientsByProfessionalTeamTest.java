package com.somare.assessment.services;


import com.somare.assessment.AssessmentApplication;
import com.somare.assessment.entity.Team;
import com.somare.assessment.repository.ProfileRepository;
import com.somare.assessment.repository.RoleRepository;
import com.somare.assessment.service.PatientService;
import com.somare.assessment.service.ProfessionalService;
import com.somare.assessment.service.TeamService;
import org.junit.jupiter.api.*;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.util.Assert;

import javax.annotation.PostConstruct;

@AutoConfigureMockMvc
@SpringBootTest(classes = AssessmentApplication.class)
public class PatientsByProfessionalTeamTest implements ApplicationContextAware {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private ProfessionalService professionalService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PatientService patientService;

    private Util util = new Util();

    private Team team = new Team();

    public static Boolean initialized = false;

    @PostConstruct
    public void setUp() {

        if(initialized) {
            return;
        }

        this.util.createProfessionalWithRoleViewAllPatients();
        this.util.createProfessionalWithTeam(team);
        this.util.createProfessionalWithoutRoleViewAllAndWithoutTeam();

        this.util.createPatients(team, 20);

        initialized = true;
    }

    @Test
    @WithUserDetails("professionalToViewAll")
    public void listPatientsWithRoleViewAll() throws Exception {
        var page = patientService.list("", PageRequest.of(0, 99));

        Assert.isTrue(page.getContent().size() == 20, "Numero incorreto de pacientes");
    }

    @Test
    @WithUserDetails("professionalWithTeam")
    public void listPatientWithTeam() throws Exception {
        var page = patientService.list("", PageRequest.of(0, 99));

        Assert.isTrue(page.getContent().size() == 10, "Numero incorreto de pacientes");
    }

    @Test
    @WithUserDetails("professionalWithoutTeam")
    public void listPatientWithRoleViewAndWithoutTeam() throws Exception {
        var page = patientService.list("", PageRequest.of(0, 99));

        Assert.isTrue(page.getContent().size() == 20, "Numero incorreto de pacientes");
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        util.setContext(applicationContext);
    }
}
