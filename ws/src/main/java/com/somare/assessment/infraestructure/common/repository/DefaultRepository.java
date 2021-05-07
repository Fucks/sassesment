package com.somare.assessment.infraestructure.common.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DefaultRepository<T> extends JpaRepository<T, Long> {
    Page<T> findAllByDisabledIsNullAndNameLike(String name, Pageable page);

}
