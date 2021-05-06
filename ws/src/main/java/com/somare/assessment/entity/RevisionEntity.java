package com.somare.assessment.entity;
import com.somare.assessment.config.AuditingRevisionListener;
import lombok.*;
import org.hibernate.envers.RevisionNumber;
import org.hibernate.envers.RevisionTimestamp;

import javax.persistence.*;
import javax.persistence.Entity;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Table(name = "REVISION", schema = "history")
@org.hibernate.envers.RevisionEntity(AuditingRevisionListener.class)
public class RevisionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @RevisionNumber
    private Long revision;

    @RevisionTimestamp
    private long timestamp;

    private String userName;

    private Long userId;

}
