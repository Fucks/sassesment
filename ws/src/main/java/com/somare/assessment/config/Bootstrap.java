package com.somare.assessment.config;

import com.somare.assessment.entity.Professional;
import com.somare.assessment.entity.authentication.Profile;
import com.somare.assessment.entity.authentication.Role;
import com.somare.assessment.repository.ProfessionalRepository;
import com.somare.assessment.repository.ProfileRepository;
import com.somare.assessment.repository.RoleRepository;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class Bootstrap implements InitializingBean {

    @Autowired
    private ProfessionalRepository professionalRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    @Qualifier("passwordEncoder")
    private PasswordEncoder passwordEncoder;

    @Override
    public void afterPropertiesSet() throws Exception {
        bootstrapRoles();
        bootstrapManagerProfile();
        bootstrapAdmUser();
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
        this.roleRepository.save(new Role(Role.ROLE_MANAGER_OCCUPATION));
    }

    public void bootstrapManagerProfile() {

        if(this.profileRepository.count() > 0) {
            return;
        }

        this.profileRepository.save(new Profile("Gerencia", this.roleRepository.findAll()));
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
}
