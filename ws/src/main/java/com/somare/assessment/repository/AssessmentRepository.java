package com.somare.assessment.repository;

import com.somare.assessment.entity.Assessment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AssessmentRepository extends JpaRepository<Assessment, Long> {

    @EntityGraph(attributePaths = {"professional"})
    Page<Assessment> findByPatient_IdOrderByStartDateDesc(Long patientId, Pageable page);


    @EntityGraph(attributePaths = {"professional", "patient", "assessmentPlan.professional"})
    @Query(value = "SELECT assessment FROM Assessment assessment WHERE id = :id")
    Assessment findByIdWithDeps(@Param("id") Long id);
}

