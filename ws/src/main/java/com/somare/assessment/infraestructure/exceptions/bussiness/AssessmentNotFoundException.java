package com.somare.assessment.infraestructure.exceptions.bussiness;

public class AssessmentNotFoundException extends RuntimeException{

    public AssessmentNotFoundException() {
        super("Atendimento não encontrado");
    }
}
