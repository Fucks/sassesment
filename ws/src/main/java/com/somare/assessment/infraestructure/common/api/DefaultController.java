package com.somare.assessment.infraestructure.common.api;

import com.somare.assessment.infraestructure.common.entity.DefaultEntity;
import com.somare.assessment.infraestructure.common.entity.Entity;
import com.somare.assessment.infraestructure.common.service.DefaultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public abstract class DefaultController<T extends Entity & DefaultEntity<T>> {

    @Autowired
    private DefaultService<T> service;

    @PostMapping()
    public ResponseEntity<T> insert(@RequestBody T entity) {

        var response = this.service.insert(entity);

        return ResponseEntity
                .ok(response);
    }

    @PutMapping("/:id")
    public ResponseEntity<T> update(@PathVariable Long id, @RequestBody T entity) {

        var response = this.service.update(id, entity);

        return ResponseEntity
                .ok(response);
    }

    @GetMapping("/:id")
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

    @PostMapping("/disable/:id")
    public ResponseEntity<T> disable(@PathVariable Long id) {
        this.service.disable(id);

        return ResponseEntity
                .ok()
                .build();
    }

    @GetMapping("/list")
    public ResponseEntity<Page<T>> list(@PageableDefault Pageable page) {
        return ResponseEntity
                .ok(this.service.list(page));
    }

}
