package com.somare.assessment.repository;

import com.somare.assessment.entity.Professional;
import com.somare.assessment.infraestructure.common.repository.DefaultRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfessionalRepository extends DefaultRepository<Professional> {

    Optional<Professional> findByEmail(String email);

    @Query(value = "SELECT professional " +
            "FROM Professional professional " +
            "LEFT JOIN FETCH professional.teams " +
            "WHERE professional.id = :id")
    Professional findByIdWithTeams(@Param("id") Long id);

}
