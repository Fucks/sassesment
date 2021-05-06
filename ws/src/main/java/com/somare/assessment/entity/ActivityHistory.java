package com.somare.assessment.entity;

import com.somare.assessment.config.DefaultConfigs;
import com.somare.assessment.infraestructure.common.entity.DefaultEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(schema = DefaultConfigs.DEFAULT_SCHEMA)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ActivityHistory extends com.somare.assessment.infraestructure.common.entity.Entity implements DefaultEntity<ActivityHistory> {

    @ManyToOne
    private Activity activity;

    @ManyToOne
    private Professional professional;

    @ManyToOne
    private Patient patient;

    @NotNull
    private LocalDateTime date;

    @OneToMany
    private List<ActivityObjectiveHistory> objectives;

    @Override
    public void update(ActivityHistory entity) {
    }
}
