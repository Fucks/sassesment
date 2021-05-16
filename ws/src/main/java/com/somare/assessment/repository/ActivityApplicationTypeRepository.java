package com.somare.assessment.repository;

import com.somare.assessment.entity.ActivityApplicationType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityApplicationTypeRepository extends JpaRepository<ActivityApplicationType, Long> {
    Page<ActivityApplicationType> findByNameLike(String filter, Pageable page);
}
