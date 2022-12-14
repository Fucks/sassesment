package com.somare.assessment.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.somare.assessment.config.ws.DefaultConfigs;
import com.somare.assessment.entity.owned.OwnedEntity;
import com.somare.assessment.infraestructure.common.entity.DefaultEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;
import java.util.List;

@Data
@Entity
@Audited
@Table(schema = DefaultConfigs.DEFAULT_SCHEMA)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Assessment extends OwnedEntity implements DefaultEntity<Assessment> {

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private Patient patient;

    @NotEmpty
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @OrderBy("startDate ASC")
    private List<ActivityHistory> assessmentPlan;

    @NotNull
    private ZonedDateTime startDate;

    private ZonedDateTime endDate;

    @JsonIgnore
    @Override
    public void update(Assessment entity) {
        this.assessmentPlan = entity.getAssessmentPlan();
    }

    @JsonIgnore
    public void finish() {
        this.endDate = ZonedDateTime.now();
    }
}
