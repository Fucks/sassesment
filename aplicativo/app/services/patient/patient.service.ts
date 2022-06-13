import { DefaultService } from "../default.service"

export interface Patient {
    id?: number;
    name: string;
    birthDate: Date;
}

export class PatientService extends DefaultService<Patient> {
    path = '/api/v1/patient'
}