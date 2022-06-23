package com.somare.assessment.entity.owned;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.somare.assessment.entity.Professional;
import com.somare.assessment.infraestructure.common.entity.Entity;
import com.somare.assessment.infraestructure.listeners.OwnedEntityListener;
import lombok.*;
import org.hibernate.envers.Audited;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
@ToString
@EntityListeners({OwnedEntityListener.class, AuditingEntityListener.class})
@EqualsAndHashCode(callSuper = true, exclude = {"professional"})
public abstract class OwnedEntity extends Entity {

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Professional professional;

}
