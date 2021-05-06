package com.somare.assessment.entity;

import com.somare.assessment.config.DefaultConfigs;
import com.somare.assessment.infraestructure.common.entity.DefaultEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(schema = DefaultConfigs.DEFAULT_SCHEMA)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Activity extends com.somare.assessment.infraestructure.common.entity.Entity implements DefaultEntity<Activity> {

    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @NotNull
    private ApplicationType type;

    @NotBlank
    private Integer retryNumber;

    @ManyToOne
    private Professional owner;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Objective> objectives;

    private void addObjective(@NotBlank String objective) {

        if(Objects.isNull(this.objectives)) {
            this.objectives = new ArrayList<>();
        }

        this.objectives.add(new Objective(objective));
    }

    @Override
    public void update(Activity entity) {
        this.name = entity.name;
        this.description = entity.description;
        this.type = entity.type;
        this.retryNumber = entity.retryNumber;
    }
}
