package com.somare.assessment.infraestructure.common.entity;

import lombok.*;
import org.hibernate.envers.Audited;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
@ToString
@EqualsAndHashCode
@EntityListeners(AuditingEntityListener.class)
public abstract class Entity implements Serializable {

    @Transient
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @CreatedBy
    protected Long createdBy;

    @Column(nullable = false,
            name = "created_at",
            columnDefinition = "TIMESTAMP WITH TIME ZONE")
    @CreatedDate
    protected ZonedDateTime createdAt;

    @LastModifiedBy
    protected Long updatedBy;

    @Column(name = "updated_at",
            columnDefinition = "TIMESTAMP WITH TIME ZONE")
    @LastModifiedDate
    protected ZonedDateTime updatedAt;

    @Column(columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private ZonedDateTime disabled;

    public Entity(Long id) {
        this.id = id;
    }
}
