package com.somare.assessment.infraestructure.common.service;

import com.somare.assessment.infraestructure.common.entity.DefaultEntity;
import com.somare.assessment.infraestructure.common.entity.Entity;
import com.somare.assessment.infraestructure.common.repository.DefaultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.Optional;

public abstract class DefaultService<T extends Entity & DefaultEntity<T>> {

    @Autowired
    public DefaultRepository<T> repository;

    public Optional<T> getById(Long id) {
        return this.repository.findById(id);
    }

    public T insert(@Valid T entity) {
        return this.repository.save(entity);
    }

    public T update(Long id, @Valid T entity) {

        var existsRow = this.getById(id);

        if(existsRow.isEmpty()){
            throw new IllegalArgumentException("Registro não encontrado!");
        }

        var dbEntity = existsRow.get();

        dbEntity.update(entity);

        dbEntity = this.repository.save(dbEntity);

        return dbEntity;
    }

    public Page<T> list(Pageable page) {
        return this.repository.findAllByDisabledIsNull(page);
    }

    public void disable(Long id) {

        var entity = this.getById(id);

        if (entity.isEmpty()) {
            throw new IllegalArgumentException("Entidade não encontrada");
        }

        this.disable(entity.get());
    }

    public void disable(T entity) {
        entity.setDisabled(LocalDateTime.now());
        this.repository.save(entity);
    }

}
