package com.somare.assessment.repository;

import com.somare.assessment.entity.Activity;
import com.somare.assessment.infraestructure.common.repository.DefaultRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ActivityRepository extends DefaultRepository<Activity> {

    Page<Activity> findAllByProfessional_IdAndPatients_Id(Long professionalId, Long patientId, Pageable page);

    Page<Activity> findAllByPatients_Id(Long patientId, Pageable page);

    @EntityGraph(attributePaths = {"objectives", "owner"})
    Optional<Activity> findById(Long id);
}
