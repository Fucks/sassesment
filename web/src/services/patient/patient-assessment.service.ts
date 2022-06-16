import { Assessment } from "../assessment/assessment.service";
import { api } from "../util/Api";
import { Page, Pageable } from "../util/page";

export class PatientAssessmentService {

    path = '/api/v1/patient';

    create = async (assessment: Assessment): Promise<Assessment> => {

        try {
            const { data, status } = await api().post<Assessment>(`${this.path}/${assessment.patient.id}/assessment`, assessment);

            if (status != 200) {
                throw new Error(`Erro ${status} ao salvar o atendimento.`);
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
                throw new Error(`Erro ${status} ao salvar o atendimento.`);
            }

            return data;
        }
        catch (err) {
            throw err;
        }
    }

}