package com.somare.assessment.repository;

import com.somare.assessment.entity.authentication.Profile;
import com.somare.assessment.infraestructure.common.repository.DefaultRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends DefaultRepository<Profile> {
}
