package com.somare.assessment.entity;

import com.somare.assessment.config.ws.DefaultConfigs;
import com.somare.assessment.entity.owned.OwnedEntity;
import com.somare.assessment.infraestructure.common.entity.DefaultEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;
import java.util.Set;

@Data
@Audited
@Entity
@Table(schema = DefaultConfigs.DEFAULT_SCHEMA)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true, exclude = {"objectives", "activity"})
public class ActivityHistory extends OwnedEntity implements DefaultEntity<ActivityHistory> {

    @ManyToOne(fetch = FetchType.EAGER)
    private Activity activity;

    @ManyToOne(fetch = FetchType.LAZY)
    private Patient patient;

    @NotNull
    private ZonedDateTime startDate;

    @NotNull
    private ZonedDateTime endDate;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @OrderBy("position ASC")
    private Set<ActivityObjectiveHistory> objectives;

    @Override
    public void update(ActivityHistory entity) {
    }
}
