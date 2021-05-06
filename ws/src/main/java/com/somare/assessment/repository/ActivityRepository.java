package com.somare.assessment.repository;

import com.somare.assessment.entity.Activity;
import com.somare.assessment.infraestructure.common.repository.DefaultRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepository extends DefaultRepository<Activity> {
}
