package com.somare.assessment.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.somare.assessment.config.ws.DefaultConfigs;
import com.somare.assessment.entity.owned.OwnedEntity;
import com.somare.assessment.infraestructure.common.entity.DefaultEntity;
import lombok.*;
import org.hibernate.envers.Audited;

import javax.persistence.Entity;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.*;

@Data
@Entity
@Audited
@Table(schema = DefaultConfigs.DEFAULT_SCHEMA)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true, exclude = {"patients", "objectives"})
@Builder
public class Activity extends OwnedEntity implements DefaultEntity<Activity> {

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

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Objective> objectives;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Patient> patients;

    @JsonIgnore
    private void addObjective(@NotBlank String objective) {

        if(Objects.isNull(this.objectives)) {
            this.objectives = new HashSet<>();
        }

        this.objectives.add(new Objective(objective));
    }

    @JsonIgnore
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
