package com.somare.assessment.infraestructure.common.api;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface CrudController<T> {

    ResponseEntity<T> insert(T entity);

    ResponseEntity<T> update(Long id, T entity);

    ResponseEntity<T> getById(Long id);

    ResponseEntity<T> disable(Long id);

    ResponseEntity<Page<T>> list(String filter, Pageable page);

}
