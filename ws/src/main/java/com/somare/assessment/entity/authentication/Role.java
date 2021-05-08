package com.somare.assessment.entity.authentication;

import com.somare.assessment.entity.Occupation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Role implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    public Role(String name) {
        this.name = name;
    }

    @Override
    public String getAuthority() {
        return this.name;
    }

    public static final String ROLE_VIEW_PROFESSIONALS = "ROLE_VIEW_PROFESSIONALS";
    public static final String ROLE_MANAGER_PROFESSIONALS = "ROLE_MANAGER_PROFESSIONALS";

    public static final String ROLE_VIEW_OCCUPATION = "ROLE_VIEW_OCCUPATION";
    public static final String ROLE_MANAGER_OCCUPATION = "ROLE_MANAGER_OCCUPATION";

    public static final String ROLE_VIEW_ALL_PATIENT = "ROLE_VIEW_ALL_PATIENT";
    public static final String ROLE_VIEW_PATIENT = "ROLE_VIEW_PATIENT";
    public static final String ROLE_MANAGER_PATIENT = "ROLE_MANAGER_PATIENT";

    public static final String ROLE_VIEW_TEAM = "ROLE_VIEW_TEAM";
    public static final String ROLE_MANAGER_TEAM = "ROLE_MANAGER_TEAM";

}
