package com.somare.assessment.services;


import com.somare.assessment.AssessmentApplication;
import com.somare.assessment.entity.Patient;
import com.somare.assessment.entity.Professional;
import com.somare.assessment.entity.Team;
import com.somare.assessment.entity.authentication.Profile;
import com.somare.assessment.entity.authentication.Role;
import com.somare.assessment.repository.ProfileRepository;
import com.somare.assessment.repository.RoleRepository;
import com.somare.assessment.service.PatientService;
import com.somare.assessment.service.ProfessionalService;
import com.somare.assessment.service.TeamService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.util.Assert;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.util.Collections;

@AutoConfigureMockMvc
@SpringBootTest(classes = AssessmentApplication.class)
public class PatientsByProfessionalTeamTest {

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

    private Team team;

    public static Boolean initialized = false;

    @PostConstruct
    public void setUp() {

        if(initialized) {
            return;
        }

        createProfessionalWithRoleViewAllPatients();
        createProfessionalWithTeam();
        createProfessionalWithoutRoleViewAllAndWithoutTeam();

        createProfessionals();

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

    private Professional createProfessionalWithRoleViewAllPatients() {

        final var ROLE_VIEW_ALL_PATIENT = this.roleRepository.findByName(Role.ROLE_VIEW_ALL_PATIENT);

        var profileViewAllPatients = new Profile();
        profileViewAllPatients.setName("View all patients");
        profileViewAllPatients.setRoles(Collections.singletonList(ROLE_VIEW_ALL_PATIENT));

        profileViewAllPatients = this.profileRepository.save(profileViewAllPatients);

        var professionalWithRoleToViewAll = new Professional();
        professionalWithRoleToViewAll.setName("ProfessionalToViewAll");
        professionalWithRoleToViewAll.setEmail("professionalToViewAll");
        professionalWithRoleToViewAll.setPassword("123456");
        professionalWithRoleToViewAll.setProfile(profileViewAllPatients);

        return this.professionalService.insert(professionalWithRoleToViewAll);
    }

    private Professional createProfessionalWithTeam() {
        final var ROLE_VIEW_PATIENT = this.roleRepository.findByName(Role.ROLE_VIEW_PATIENT);

        var profileViewPatients = new Profile();
        profileViewPatients.setName("View patients");
        profileViewPatients.setRoles(Collections.singletonList(ROLE_VIEW_PATIENT));

        profileViewPatients = this.profileRepository.save(profileViewPatients);

        var professionalWithRoleToView = new Professional();
        professionalWithRoleToView.setName("ProfessionalWithTeam");
        professionalWithRoleToView.setEmail("professionalWithTeam");
        professionalWithRoleToView.setPassword("123456");
        professionalWithRoleToView.setProfile(profileViewPatients);

        professionalWithRoleToView = this.professionalService.insert(professionalWithRoleToView);

        team = new Team();
        team.setName("Equipe A");

        team.addProfessional(professionalWithRoleToView);

        team = teamService.insert(team);

        return professionalWithRoleToView;
    }

    private Professional createProfessionalWithoutRoleViewAllAndWithoutTeam() {
        final var ROLE_VIEW_PATIENT = this.roleRepository.findByName(Role.ROLE_VIEW_PATIENT);

        var profileViewPatients = new Profile();
        profileViewPatients.setName("View patients");
        profileViewPatients.setRoles(Collections.singletonList(ROLE_VIEW_PATIENT));

        profileViewPatients = this.profileRepository.save(profileViewPatients);

        var professionalWithRoleToView = new Professional();
        professionalWithRoleToView.setName("ProfessionalWithoutTeam");
        professionalWithRoleToView.setEmail("professionalWithoutTeam");
        professionalWithRoleToView.setPassword("123456");
        professionalWithRoleToView.setProfile(profileViewPatients);

        return this.professionalService.insert(professionalWithRoleToView);
    }

    private void createProfessionals() {

        for(int i = 0; i < 20; i++) {

            var patient = new Patient();
            patient.setName(String.valueOf(i));
            patient.setBirthDate(LocalDate.of(1992, 5, 18));

            patient = this.patientService.insert(patient);

            if(i % 2 == 0) {
                team.addPatient(patient);
            }

        }

        teamService.update(team.getId(), team);

    }
}
