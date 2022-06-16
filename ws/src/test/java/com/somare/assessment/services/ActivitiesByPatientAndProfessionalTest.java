package com.somare.assessment.services;

import com.somare.assessment.AssessmentApplication;
import com.somare.assessment.api.v1.ProfessionalController;
import com.somare.assessment.entity.*;
import com.somare.assessment.infraestructure.ProfessionalUserDetails;
import com.somare.assessment.repository.ActivityApplicationTypeRepository;
import com.somare.assessment.repository.ActivityHelpTypeRepository;
import com.somare.assessment.repository.ProfessionalRepository;
import com.somare.assessment.service.ActivityService;
import com.somare.assessment.service.PatientService;
import com.somare.assessment.service.ProfessionalService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.util.Assert;

import javax.annotation.PostConstruct;
import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

@AutoConfigureMockMvc
@SpringBootTest(classes = AssessmentApplication.class)
public class ActivitiesByPatientAndProfessionalTest implements ApplicationContextAware {

    @Autowired
    private PatientService patientService;

    @Autowired
    private ProfessionalRepository professionalRepository;

    @Autowired
    private ActivityService activityService;

    @Autowired
    private ActivityApplicationTypeRepository activityApplicationTypeRepository;

    @Autowired
    private ActivityHelpTypeRepository activityHelpTypeRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    private Util util = new Util();

    private Team team = new Team();

    public static Boolean initialized = false;

    @PostConstruct
    public void setUp() {

        try{

            if (initialized) {
                return;
            }

            this.util.createProfessionalWithRoleViewAllPatients();
            this.util.createProfessionalWithTeam(team);
            this.util.createProfessionalWithoutRoleViewAllAndWithoutTeam();

            this.util.createPatients(team, 1);

            initialized = true;

        }
        catch (Exception e) {}
    }

    @Test
    @WithUserDetails("professionalToViewAll")
    public void createActivityWithSuccess() {

        var applicationType = this.activityApplicationTypeRepository.getOne(1L);
        var helpType = this.activityHelpTypeRepository.getOne(1L);

        var activity = Activity.builder()
                .activityApplicationType(applicationType)
                .helpType(helpType)
                .name("Teste de cores")
                .description("Tempo de resposta do paciente ao estimulo usando cores")
                .retryNumber(5)
                .objectives(new HashSet<>(Arrays.asList(new Objective("Olhos"), new Objective("Reflexo"))))
                .build();

        activity = this.activityService.insert(activity);

        Assert.notNull(activity.getId(), "Id nao foi gerado");

        var dbActivity = this.activityService.getById(activity.getId());

        Assert.isTrue(dbActivity.isPresent(), "Nao foi encontrada a atividade no banco de dados");
        Assert.isTrue(dbActivity.get().getOwner() != null, "O owner não foi adicionado automaticamente");
        Assert.isTrue(dbActivity.get().getOwner().getEmail().equals("professionalToViewAll"), "O owner não condiz com o que cadastrou");
        Assert.isTrue(dbActivity.get().getObjectives().size() == 2, "Objetivos não possui a mesma quantidade");

    }

    @Test
    @WithUserDetails("professionalToViewAll")
    public void listAllActivitiesOfPatientWithSuccess() {

        var applicationType = this.activityApplicationTypeRepository.getOne(1L);
        var helpType = this.activityHelpTypeRepository.getOne(1L);

        util.createPatients(null, 2);

        var patientOne = this.patientService.getById(1L).get();
        var patientTwo = this.patientService.getById(2L).get();

        var activityOne = Activity.builder()
                .activityApplicationType(applicationType)
                .helpType(helpType)
                .name("Teste de cores")
                .description("Tempo de resposta do paciente ao estimulo usando cores")
                .retryNumber(5)
                .patients(new HashSet<>(Collections.singletonList(patientOne)))
                .objectives(new HashSet<>(Arrays.asList(new Objective("Olhos"), new Objective("Reflexo"))))
                .build();

        var activityTwo = Activity.builder()
                .activityApplicationType(applicationType)
                .helpType(helpType)
                .name("Teste de palavras")
                .description("Tempo de resposta do paciente")
                .retryNumber(5)
                .patients(new HashSet<>(Arrays.asList(patientOne, patientTwo)))
                .objectives(new HashSet<>(Arrays.asList(new Objective("Olhos"), new Objective("Reflexo"))))
                .build();

        activityOne = this.activityService.insert(activityOne);
        activityTwo = this.activityService.insert(activityTwo);

        var patientOneActivities = this.patientService.listByPatientId(patientOne.getId(), PageRequest.of(0, 10));
        var patientTwoActivities = this.patientService.listByPatientId(patientTwo.getId(), PageRequest.of(0, 10));

        Assert.isTrue(patientOneActivities.getTotalElements() == 2, "O numero de atividades listadas para o paciente 1 está incorreto");
        Assert.isTrue(patientTwoActivities.getTotalElements() == 1, "O numero de atividades listadas para o paciente 2 está incorreto");
    }

    @Test
    @WithUserDetails("professionalToViewAll")
    public void listAllActivitiesOfPatientWithProfessionalDifferent() {

        var applicationType = this.activityApplicationTypeRepository.getOne(1L);
        var helpType = this.activityHelpTypeRepository.getOne(1L);

        util.createPatients(null, 2);

        var patientOne = this.patientService.getById(1L).get();
        var patientTwo = this.patientService.getById(2L).get();

        var activityOne = Activity.builder()
                .activityApplicationType(applicationType)
                .helpType(helpType)
                .name("Teste de cores")
                .description("Tempo de resposta do paciente ao estimulo usando cores")
                .retryNumber(5)
                .patients(new HashSet<>(Collections.singletonList(patientOne)))
                .objectives(new HashSet<>(Arrays.asList(new Objective("Olhos"), new Objective("Reflexo"))))
                .build();

        var activityTwo = Activity.builder()
                .activityApplicationType(applicationType)
                .helpType(helpType)
                .name("Teste de palavras")
                .description("Tempo de resposta do paciente")
                .retryNumber(5)
                .patients(new HashSet<>(Arrays.asList(patientOne, patientTwo)))
                .objectives(new HashSet<>(Arrays.asList(new Objective("Olhos"), new Objective("Reflexo"))))
                .build();

        activityOne = this.activityService.insert(activityOne);
        activityTwo = this.activityService.insert(activityTwo);

        UsernamePasswordAuthenticationToken authReq
                = new UsernamePasswordAuthenticationToken("professionalWithTeam", "123456");
        Authentication auth = authenticationManager.authenticate(authReq);
        SecurityContextHolder.getContext().setAuthentication(auth);

        var patientOneActivities = this.patientService.listByPatientId(1L, PageRequest.of(0, 10));
        var patientTwoActivities = this.patientService.listByPatientId(2L, PageRequest.of(0, 10));

        Assert.isTrue(patientOneActivities.getTotalElements() == 0, "O numero de atividades listadas para o paciente 1 está incorreto");
        Assert.isTrue(patientTwoActivities.getTotalElements() == 0, "O numero de atividades listadas para o paciente 2 está incorreto");    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        util.setContext(applicationContext);
    }
}
