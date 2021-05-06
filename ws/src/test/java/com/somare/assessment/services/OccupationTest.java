package com.somare.assessment.services;

import com.somare.assessment.AssessmentApplication;
import com.somare.assessment.entity.Occupation;
import com.somare.assessment.service.OccupationService;
import org.assertj.core.api.Fail;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.util.Assert;

@AutoConfigureMockMvc
@SpringBootTest(classes = AssessmentApplication.class)
public class OccupationTest {

    @Autowired
    private OccupationService occupationService;

    @Test
    public void createOccupationWithoutAllRequiredFieldsWithError() {

        var occupation = new Occupation();

        try {
            occupationService.insert(occupation);
            Fail.fail("Ocupação não deveria ser salva sem um nome");
        } catch (Exception e) {
        }
    }

    @Test
    public void createOccupationWithAllFieldsWithSuccess() {

        var occupation = new Occupation();
        occupation.setName("Gestor");

        occupationService.insert(occupation);

        Assert.notNull(occupation.getId(), "O id não pode estar vazio");

        Page<Occupation> page = occupationService.list(PageRequest.of(0, 1));

        Assert.notEmpty(page.getContent(), "O conteudo da pagina nao pode estar vazio");
    }

    @Test
    public void listOccupationsByPageWithSuccess() {

        var occupations = new String[]{"Gestor", "Fonoaudiologo", "Pediatra", "Psicologo", "Terapeuta", "Comunicador Social", "AA", "Psicopedagogo"};

        for (int i = 0; i < occupations.length; i++) {
            occupationService.insert(new Occupation(occupations[i]));
        }

        Page<Occupation> page = occupationService.list(PageRequest.of(0, 4));

        Assert.notEmpty(page.getContent(), "O conteudo da pagina nao pode estar vazio");
        Assert.isTrue(page.getTotalPages() > 1, "O numero de paginas deve ser igual a 2");
    }

    @Test
    public void disableOccupationWithSuccess() {

        var occupation = new Occupation();
        occupation.setName("Ocupação a ser desabilitada");

        final var dbOccupation = this.occupationService.insert(occupation);

        this.occupationService.disable(dbOccupation);

        var page = this.occupationService.list(PageRequest.of(0, 99));

        Assert.isTrue(page.getContent()
                .stream()
                .noneMatch(e -> e.getId().equals(dbOccupation.getId())), "A ocupação desabilitada não deve ser listada");

    }

}
