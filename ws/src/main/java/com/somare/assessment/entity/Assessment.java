package com.somare.assessment.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.somare.assessment.config.DefaultConfigs;
import com.somare.assessment.infraestructure.common.entity.DefaultEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

@Data
@Entity
@Table(schema = DefaultConfigs.DEFAULT_SCHEMA)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Assessment extends com.somare.assessment.infraestructure.common.entity.Entity implements DefaultEntity<Objective> {

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private Patient patient;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private Professional professional;

    @NotEmpty
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ActivityHistory> assessmentPlan;

    @NotNull
    private ZonedDateTime startDate;

    private ZonedDateTime endDate;

    @Override
    public void update(Objective entity) {
    }
}
