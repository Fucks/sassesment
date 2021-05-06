package com.somare.assessment.repository;

import com.somare.assessment.entity.Team;
import com.somare.assessment.infraestructure.common.repository.DefaultRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends DefaultRepository<Team> {

    @Query(value = "SELECT team " +
            "FROM Team team " +
            "LEFT JOIN FETCH team.professionals " +
            "LEFT JOIN FETCH team.patients " +
            "WHERE team.id = :id")
    Team getByIdWithMembers(@Param("id") Long id);

    Page<Team> findAllByDisabledIsNull(Pageable page);
}
