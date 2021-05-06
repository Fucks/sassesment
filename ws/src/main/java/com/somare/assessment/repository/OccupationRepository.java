package com.somare.assessment.repository;

import com.somare.assessment.entity.Occupation;
import com.somare.assessment.infraestructure.common.repository.DefaultRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OccupationRepository extends DefaultRepository<Occupation> {
}
