package com.somare.assessment.services;

import com.somare.assessment.AssessmentApplication;
import com.somare.assessment.entity.Professional;
import com.somare.assessment.service.ProfessionalService;
import org.assertj.core.api.Fail;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;


@AutoConfigureMockMvc
@SpringBootTest(classes = AssessmentApplication.class)
public class ProfessionalTest {

    @Autowired
    private ProfessionalService professionalService;

    @Test
    public void createProfessionalWithMinimalDataWithSuccess() {
        var professional = new Professional();

        professional.setName("Administrador");
        professional.setPassword("123456");
        professional.setEmail("administrador@somare.com.br");

        professional = professionalService.insert(professional);

        Assert.notNull(professional.getId(), "Id não foi auto gerado");

        var dbProfessional = professionalService.getById(professional.getId());

        Assert.isTrue(dbProfessional.isPresent(), "Não foi salvo no banco o profissional criado");
    }

    @Test
    public void createProfessionalWithoutPasswordFail() {

        var professional = new Professional();

        professional.setName("Sem todos os dados");
        professional.setEmail("email@somare.com.br");

        try{
            professional = professionalService.insert(professional);
            Fail.fail("Não pode cadastrar profissional sem password");
        }
        catch (Exception e) {}
    }

    @Test
    public void createProfessionalWithoutNameFail() {

        var professional = new Professional();

        professional.setPassword("123456");
        professional.setEmail("email@somare.com.br");

        try{
            professional = professionalService.insert(professional);
            Fail.fail("Não pode cadastrar profissional sem password");
        }
        catch (Exception e) {}
    }

    @Test
    public void createProfessionalWithoutEmailFail() {

        var professional = new Professional();

        professional.setName("Sem todos os dados");
        professional.setPassword("123456");

        try{
            professional = professionalService.insert(professional);
            Fail.fail("Não pode cadastrar profissional sem password");
        }
        catch (Exception e) {}
    }

}
