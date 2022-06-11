package com.somare.assessment.repository;

import com.somare.assessment.entity.Team;
import com.somare.assessment.infraestructure.common.repository.DefaultRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends DefaultRepository<Team> {

    @Query(value = "SELECT team " +
            "FROM Team team " +
            "LEFT JOIN FETCH team.professionals " +
            "LEFT JOIN FETCH team.patients " +
            "WHERE team.id = :id " +
            "AND team.disabled IS NULL")
    Team getByIdWithMembers(@Param("id") Long id);

    List<Team> findByPatients_IdAndDisabledIsNull(Long patientId);

    Page<Team> findDistinctByPatients_IdNotAndNameLikeAndDisabledIsNull(Long patientId, String filter, Pageable page);
}
