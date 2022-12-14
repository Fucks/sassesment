package com.somare.assessment.entity;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.somare.assessment.config.ws.DefaultConfigs;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import javax.persistence.Entity;

@Data
@Entity
@Audited
@Table(schema = DefaultConfigs.DEFAULT_SCHEMA)
@AllArgsConstructor
@NoArgsConstructor
public class ActivityObjectiveHistory extends com.somare.assessment.infraestructure.common.entity.Entity {

    @ManyToOne
    private Objective objective;

    @Enumerated(value = EnumType.STRING)
    private ObjectiveValue value;

    @JsonAlias("order")
    private Integer position;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        ActivityObjectiveHistory that = (ActivityObjectiveHistory) o;

        return super.id != null && super.id.equals(that.id);
    }
}
