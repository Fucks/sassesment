package com.somare.assessment.infraestructure.common.api;

import com.somare.assessment.api.parsers.ModelToEntityParserAdapter;
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

public abstract class SimpleEntityModelController<T extends Entity & DefaultEntity<T>, S> implements CrudController<S> {

    @Autowired
    private DefaultService<T> service;

    @Autowired
    private ModelToEntityParserAdapter<T, S> parserAdapter;

    @Override
    @PostMapping()
    public ResponseEntity<S> insert(@RequestBody S model) {

        var entity = parserAdapter.serializeToEntity(model);

        var response = this.service.insert(entity);

        return ResponseEntity
                .ok(parserAdapter.serializeToModel(response));

    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<S> update(@PathVariable Long id, @RequestBody S model) {

        var response = this.service.update(id, parserAdapter.serializeToEntity(model));

        return ResponseEntity
                .ok(parserAdapter.serializeToModel(response));
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<S> getById(@PathVariable Long id) {

        var hasEntity = this.service.getById(id);

        if (hasEntity.isEmpty()) {
            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity
                .ok(parserAdapter.serializeToModel(hasEntity.get()));
    }

    @Override
    @PostMapping("/disable/{id}")
    public ResponseEntity<S> disable(@PathVariable Long id) {
        this.service.disable(id);

        return ResponseEntity
                .ok()
                .build();
    }

    @Override
    @GetMapping("/list")
    public ResponseEntity<Page<S>> list(String filter, @PageableDefault Pageable page) {
        return ResponseEntity
                .ok(this.service.list(new LikeFilterDecorator(filter).decorate(), page).map(parserAdapter::serializeToModel));
    }
}
