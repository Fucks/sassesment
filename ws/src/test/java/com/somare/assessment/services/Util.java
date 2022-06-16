package com.somare.assessment.services;

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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.HashSet;

@Service
public class Util {

    private RoleRepository roleRepository;
    private ProfileRepository profileRepository;
    private ProfessionalService professionalService;
    private TeamService teamService;
    private PatientService patientService;

    public static ApplicationContext context;

    private void init() {
        this.roleRepository = Util.context.getBean(RoleRepository.class);
        this.profileRepository = Util.context.getBean(ProfileRepository.class);
        this.professionalService = Util.context.getBean(ProfessionalService.class);
        this.teamService = Util.context.getBean(TeamService.class);
        this.patientService = Util.context.getBean(PatientService.class);
    }

    public Professional createProfessionalWithRoleViewAllPatients() {

        final var ROLE_VIEW_ALL_PATIENT = this.roleRepository.findByName(Role.ROLE_VIEW_ALL_PATIENT);

        var profileViewAllPatients = new Profile();
        profileViewAllPatients.setName("View all patients");
        profileViewAllPatients.setRoles(new HashSet<>(Collections.singletonList(ROLE_VIEW_ALL_PATIENT)));

        profileViewAllPatients = this.profileRepository.save(profileViewAllPatients);

        var professionalWithRoleToViewAll = new Professional();
        professionalWithRoleToViewAll.setName("ProfessionalToViewAll");
        professionalWithRoleToViewAll.setEmail("professionalToViewAll");
        professionalWithRoleToViewAll.setPassword("123456");
        professionalWithRoleToViewAll.setProfile(profileViewAllPatients);

        return this.professionalService.insert(professionalWithRoleToViewAll);
    }

    public Professional createProfessionalWithTeam(Team team) {
        final var ROLE_VIEW_PATIENT = this.roleRepository.findByName(Role.ROLE_VIEW_PATIENT);

        var profileViewPatients = new Profile();
        profileViewPatients.setName("View patients");
        profileViewPatients.setRoles(new HashSet<>(Collections.singletonList(ROLE_VIEW_PATIENT)));

        profileViewPatients = this.profileRepository.save(profileViewPatients);

        var professionalWithRoleToView = new Professional();
        professionalWithRoleToView.setName("ProfessionalWithTeam");
        professionalWithRoleToView.setEmail("professionalWithTeam");
        professionalWithRoleToView.setPassword("123456");
        professionalWithRoleToView.setProfile(profileViewPatients);

        professionalWithRoleToView = this.professionalService.insert(professionalWithRoleToView);

        team.setName("Equipe A");

        team.addProfessional(professionalWithRoleToView);

        team = teamService.insert(team);

        return professionalWithRoleToView;
    }

    public Professional createProfessionalWithoutRoleViewAllAndWithoutTeam() {
        final var ROLE_VIEW_PATIENT = this.roleRepository.findByName(Role.ROLE_VIEW_PATIENT);

        var profileViewPatients = new Profile();
        profileViewPatients.setName("View patients");
        profileViewPatients.setRoles(new HashSet<>(Collections.singletonList(ROLE_VIEW_PATIENT)));

        profileViewPatients = this.profileRepository.save(profileViewPatients);

        var professionalWithRoleToView = new Professional();
        professionalWithRoleToView.setName("ProfessionalWithoutTeam");
        professionalWithRoleToView.setEmail("professionalWithoutTeam");
        professionalWithRoleToView.setPassword("123456");
        professionalWithRoleToView.setProfile(profileViewPatients);

        return this.professionalService.insert(professionalWithRoleToView);
    }

    public void createPatients(Team team, int number) {

        for(int i = 0; i < number; i++) {

            var patient = new Patient();
            patient.setName(String.valueOf(i));
            patient.setBirthDate(LocalDate.of(1992, 5, 18));

            patient = this.patientService.insert(patient);

            if(i % 2 == 0 && team != null) {
                team.addPatient(patient);
            }

        }

        if( team != null) {
            teamService.update(team.getId(), team);
        }

    }

    public void setContext(ApplicationContext context){
        Util.context = context;
        this.init();
    }
}
