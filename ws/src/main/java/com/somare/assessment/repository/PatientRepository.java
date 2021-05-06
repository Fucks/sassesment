package com.somare.assessment.repository;

import com.somare.assessment.entity.Patient;
import com.somare.assessment.infraestructure.common.repository.DefaultRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends DefaultRepository<Patient> {

    Page<Patient> findAllByTeams_IdIn(List<Long> ids, Pageable page);

}
