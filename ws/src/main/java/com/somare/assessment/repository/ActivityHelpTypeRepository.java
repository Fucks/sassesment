package com.somare.assessment.repository;

import com.somare.assessment.entity.ActivityHelpType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityHelpTypeRepository extends JpaRepository<ActivityHelpType, Long> {
    Page<ActivityHelpType> findByNameLike(String filter, Pageable page);

}
