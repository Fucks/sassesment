package com.somare.assessment.service;

import com.somare.assessment.entity.Professional;
import com.somare.assessment.infraestructure.common.service.DefaultService;
import com.somare.assessment.repository.ProfessionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Service
public class ProfessionalService extends DefaultService<Professional> {

    @Autowired
    private ProfessionalRepository professionalRepository;

    @Autowired
    @Qualifier("passwordEncoder")
    private PasswordEncoder passwordEncoder;

    @Override
    public Professional insert(@Valid Professional professional) {

        professional.setPassword(passwordEncoder.encode(professional.getPassword()));

        return this.professionalRepository.save(professional);
    }

    @Override
    public Professional update(@NotNull Long id, @Valid Professional professional) {

        var dbProfessional = this.professionalRepository.findById(id);

        if (dbProfessional.isEmpty()) {
            throw new IllegalArgumentException("Profissional não registrado.");
        }

        var _dbProfessional = dbProfessional.get();

        _dbProfessional.update(professional);

        return _dbProfessional;
    }
}
