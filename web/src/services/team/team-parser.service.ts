import { Patient } from "../patient/patient.service";
import { Professional } from "../professional/professional.service";
import { Team } from "./team.service";


export interface ProfessionalSelectItem {
    label: string;
    value: Professional
}

export interface PatientSelectItem {
    label: String;
    value: Patient;
}

export interface FormEntity {
    name: string;
    professionals: ProfessionalSelectItem[];
    patients: PatientSelectItem[]
}

export class TeamParser {

    parseEntityToFormModel = (entity: Team): FormEntity => {

        return {
            name: entity.name,
            professionals: entity.professionals?.map(prof => ({
                label: prof.name,
                value: prof
            })) || [],
            patients: entity.patients?.map(pat => ({
                label: pat.name,
                value: pat
            })) || []
        }
    }

    parseFormModelToEntity = (model: FormEntity): Team => {
        return {
            name: model.name,
            professionals: model.professionals.map(prof => prof.value),
            patients: model.patients.map(pat => pat.value)
        }
    }
} 