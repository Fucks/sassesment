package com.somare.assessment.entity;

import com.somare.assessment.config.DefaultConfigs;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.Entity;

@Data
@Entity
@Table(schema = DefaultConfigs.DEFAULT_SCHEMA)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ActivityObjectiveHistory extends com.somare.assessment.infraestructure.common.entity.Entity {

    @ManyToOne
    private Objective objective;

    @Enumerated(value = EnumType.STRING)
    private ObjectiveValue value;

}
