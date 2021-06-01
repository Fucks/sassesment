package com.somare.assessment.entity;

import com.somare.assessment.config.DefaultConfigs;
import com.somare.assessment.infraestructure.common.entity.DefaultEntity;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
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
@Builder
public class Activity extends com.somare.assessment.infraestructure.common.entity.Entity implements DefaultEntity<Activity> {

    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    private ActivityApplicationType activityApplicationType;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    private ActivityHelpType helpType;

    private Integer helpDelay;

    @NotNull
    private Integer retryNumber;

    @ManyToOne(fetch = FetchType.EAGER)
    private Professional owner;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Objective> objectives;

    @ManyToMany
    private List<Patient> patients;

    private void addObjective(@NotBlank String objective) {

        if(Objects.isNull(this.objectives)) {
            this.objectives = new ArrayList<>();
        }

        this.objectives.add(new Objective(objective));
    }

    @Override
    public void update(Activity entity) {
        this.name = entity.getName();
        this.description = entity.getDescription();
        this.activityApplicationType = entity.getActivityApplicationType();
        this.retryNumber = entity.getRetryNumber();
        this.helpType = entity.getHelpType();
        this.helpDelay = entity.getHelpDelay();
    }
}
