package com.somare.assessment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.envers.repository.support.EnversRevisionRepositoryFactoryBean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@SpringBootApplication
@EnableAutoConfiguration
@EnableJpaRepositories(basePackages = {
        "com.somare.assessment.repository",
        "com.somare.assessment.entity"
}, repositoryFactoryBeanClass = EnversRevisionRepositoryFactoryBean.class)
@ComponentScan(basePackages = {
        "com.somare.assessment.api",
        "com.somare.assessment.service",
        "com.somare.assessment.config",
        "com.somare.assessment.infraestructure"
})
@EnableSpringDataWebSupport
public class AssessmentApplication {

    public static void main(String[] args) {
        SpringApplication.run(AssessmentApplication.class, args);
    }

}
