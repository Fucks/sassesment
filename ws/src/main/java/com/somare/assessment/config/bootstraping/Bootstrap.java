package com.somare.assessment.config.bootstraping;

import com.somare.assessment.entity.ActivityApplicationType;
import com.somare.assessment.entity.ActivityHelpType;
import com.somare.assessment.entity.Occupation;
import com.somare.assessment.entity.Professional;
import com.somare.assessment.entity.authentication.Profile;
import com.somare.assessment.entity.authentication.Role;
import com.somare.assessment.repository.*;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.stream.Collectors;

@Component
public class Bootstrap implements InitializingBean {

    @Autowired
    private ProfessionalRepository professionalRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private OccupationRepository occupationRepository;

    @Autowired
    private ActivityApplicationTypeRepository applicationTypeRepository;

    @Autowired
    private ActivityHelpTypeRepository helpTypeRepository;

    @Autowired
    @Qualifier("passwordEncoder")
    private PasswordEncoder passwordEncoder;

    @Override
    public void afterPropertiesSet() throws Exception {
        bootstrapRoles();
        bootstrapManagerProfile();
        bootstrapAdmUser();
        bootstrapOccupations();
        bootstrapApplicationTypes();
        bootstrapHelpTypes();
    }

    public void bootstrapRoles() {

        if(this.roleRepository.count() > 0) {
            return;
        }

        this.roleRepository.save(new Role(Role.ROLE_VIEW_PROFESSIONALS));
        this.roleRepository.save(new Role(Role.ROLE_MANAGER_PROFESSIONALS));
        this.roleRepository.save(new Role(Role.ROLE_VIEW_TEAM));
        this.roleRepository.save(new Role(Role.ROLE_MANAGER_TEAM));
        this.roleRepository.save(new Role(Role.ROLE_MANAGER_OCCUPATION));
        this.roleRepository.save(new Role(Role.ROLE_VIEW_OCCUPATION));
        this.roleRepository.save(new Role(Role.ROLE_VIEW_ALL_PATIENT));
        this.roleRepository.save(new Role(Role.ROLE_VIEW_PATIENT));
        this.roleRepository.save(new Role(Role.ROLE_MANAGER_PATIENT));
        this.roleRepository.save(new Role(Role.ROLE_VIEW_PROFILES));
        this.roleRepository.save(new Role(Role.ROLE_MANAGER_PROFILES));
    }

    public void bootstrapManagerProfile() {

        if(this.profileRepository.count() > 0) {
            return;
        }

        this.profileRepository.save(new Profile("Gerencia", new HashSet<>(this.roleRepository.findAll())));
    }

    public void bootstrapAdmUser() {

        if(this.professionalRepository.count() > 0) {
            return;
        }

        var professional = new Professional();
        professional.setEmail("administracao@somare.com.br");
        professional.setPassword(passwordEncoder.encode("123456"));
        professional.setName("Administrador");
        professional.setProfile(this.profileRepository.getOne(1L));

        this.professionalRepository.save(professional);
    }

    public void bootstrapOccupations() {

        if(this.occupationRepository.count() > 0) {
            return;
        }

        this.occupationRepository.save(new Occupation("Gestor"));
        this.occupationRepository.save(new Occupation("Fonoaudiologo"));
        this.occupationRepository.save(new Occupation("Psicologo"));
        this.occupationRepository.save(new Occupation("Terapeuta ocupacional"));
        this.occupationRepository.save(new Occupation("Psicopedagogo"));

    }

    public void bootstrapApplicationTypes() {

        if(this.applicationTypeRepository.count() > 0) {
            return;
        }

        this.applicationTypeRepository.save(new ActivityApplicationType("Linha de base"));
        this.applicationTypeRepository.save(new ActivityApplicationType("Intervenção"));
        this.applicationTypeRepository.save(new ActivityApplicationType("Manutenção"));
        this.applicationTypeRepository.save(new ActivityApplicationType("Sonda"));
    }

    public void bootstrapHelpTypes() {

        if(this.helpTypeRepository.count() > 0) {
            return;
        }

        this.helpTypeRepository.save(new ActivityHelpType("Ajuda ecoica"));
        this.helpTypeRepository.save(new ActivityHelpType("Ajuda física parcial"));
        this.helpTypeRepository.save(new ActivityHelpType("Ajuda física total"));
        this.helpTypeRepository.save(new ActivityHelpType("Ajuda gestual"));
        this.helpTypeRepository.save(new ActivityHelpType("Independente (sem ajuda)"));
        this.helpTypeRepository.save(new ActivityHelpType("Ajuda necessária"));
    }
}
