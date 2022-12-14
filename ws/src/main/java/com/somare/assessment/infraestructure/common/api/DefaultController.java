package com.somare.assessment.infraestructure.common.api;

import com.somare.assessment.infraestructure.common.entity.DefaultEntity;
import com.somare.assessment.infraestructure.common.entity.Entity;
import com.somare.assessment.infraestructure.common.service.DefaultService;
import com.somare.assessment.infraestructure.decorators.LikeFilterDecorator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public abstract class DefaultController<T extends Entity & DefaultEntity<T>> implements CrudController<T> {

    @Autowired
    private DefaultService<T> service;

    @Override
    @PostMapping()
    public ResponseEntity<T> insert(@RequestBody T entity) {

        var response = this.service.insert(entity);

        return ResponseEntity
                .ok(response);
    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<T> update(@PathVariable Long id, @RequestBody T entity) {

        var response = this.service.update(id, entity);

        return ResponseEntity
                .ok(response);
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<T> getById(@PathVariable Long id) {

        var hasEntity = this.service.getById(id);

        if (hasEntity.isEmpty()) {
            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity
                .ok(hasEntity.get());
    }

    @Override
    @PostMapping("/disable/{id}")
    public ResponseEntity<T> disable(@PathVariable Long id) {
        this.service.disable(id);

        return ResponseEntity
                .ok()
                .build();
    }

    @Override
    @GetMapping("/list")
    public ResponseEntity<Page<T>> list(@RequestParam String filter, @PageableDefault Pageable page) {
        return ResponseEntity
                .ok(this.service.list(new LikeFilterDecorator(filter).decorate(), page));
    }

}
