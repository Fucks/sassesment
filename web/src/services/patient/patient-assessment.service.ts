import { Professional } from "../professional/professional.service";
import { api } from "../util/Api";
import { Page, Pageable } from "../util/page";
import { Activity, Objective } from "./patient-activity.service";
import { Patient } from "./patient.service";


export interface ActivityObjectiveHistory {
    __id?: string;
    objective: Objective,
    order: number;
    value?: 'BAD' | 'SUCCESS' | 'SUCCESS_WITH_HELP'
}

export interface ActivityHistory {
    activity: Activity,
    professional?: Professional,
    patient: Patient,
    startDate: Date,
    endDate?: Date,
    objectives: ActivityObjectiveHistory[]
}

export interface Assessment {
    id?: number;
    patient: Patient,
    professional?: Professional,
    startDate: Date,
    endDate?: Date,
    assessmentPlan: ActivityHistory[]
}

export class PatientAssessmentService {

    path = '/api/v1/patient';

    create = async (assessment: Assessment): Promise<Assessment> => {

        try {
            const { data, status } = await api().post<Assessment>(`${this.path}/${assessment.patient.id}/assessment`, assessment);

            if (status != 200) {
                console.error(data);
                throw new Error(`Erro ao salvar o atendimento.`);
            }

            return data;
        }
        catch (err) {
            throw err;
        }
    }

    update = async (assessment: Assessment): Promise<Assessment> => {

        try {
            const { data, status } = await api().put<Assessment>(`${this.path}/${assessment.patient.id}/assessment`, assessment);

            if (status != 200) {
                console.error(data);
                throw new Error(`Erro ao atualizar o atendimento.`);
            }

            return data;
        }
        catch (err) {
            throw err;
        }
    }


    load = async (patientId: number, page: Page): Promise<Pageable<Assessment>> => {

        try {
            const { data, status } = await api().get<Pageable<Assessment>>(`${this.path}/${patientId}/assessment/list?&page=${page.page}&size=${page.size}`);

            if (status != 200) {
                console.error(data);
                throw new Error(`Erro ao carregar os atendimentos.`);
            }

            return data;
        }
        catch (err) {
            throw err;
        }
    }

    finish = async (assessment: Assessment): Promise<Assessment> => {

        try {
            const { data, status } = await api().post<Assessment>(`${this.path}/${assessment.patient.id}/assessment/finish`, assessment);

            if (status != 200) {
                console.error(data);
                throw new Error(`Erro ao finalizar o atendimento.`);
            }

            return data;
        }
        catch (err) {
            throw err;
        }
    }

}