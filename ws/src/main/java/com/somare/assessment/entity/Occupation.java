package com.somare.assessment.entity;

import com.somare.assessment.config.ws.DefaultConfigs;
import com.somare.assessment.infraestructure.common.entity.DefaultEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.envers.Audited;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Data
@Entity
@Audited
@Table(name = "ocuppation", schema = DefaultConfigs.DEFAULT_SCHEMA)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Occupation extends com.somare.assessment.infraestructure.common.entity.Entity implements DefaultEntity<Occupation> {

    @NotBlank
    @Column
    private String name;

    @Override
    public void update(Occupation entity) {
        this.name = entity.name;
    }
}
