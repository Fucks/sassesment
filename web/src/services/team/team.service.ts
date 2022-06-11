import async from "react-select/async";
import { Patient } from "../patient/patient.service";
import { Professional } from "../professional/professional.service";
import { api } from "../util/Api";
import { DefaultService } from "../util/default-service";
import { Page, Pageable } from "../util/page";

export interface Team {
    id?: number;
    name: string;
    professionals?: Professional[];
    patients?: Patient[];
}

export class TeamService extends DefaultService<Team>{

    path = '/api/v1/teams'

    filterTeamsNotAttachedToPatient = async (filter: string | null, id: number, page: Page): Promise<Pageable<Team>> => {

        try {
            const { data, status } = await api().get<Pageable<Team>>(`${this.path}/patients/${id}/filter-not-in?filter=${filter}&page=${page.page}&size=${page.size}`);

            if (status != 200) {
                throw new Error(`Erro ${status} ao buscar os registros`);
            }

            return data;
        }
        catch (err) {
            throw err;
        }
    }

    addPatient = async (id: number, patientId: number): Promise<Team> => {
        try {
            const { data, status } = await api().post<Team>(`${this.path}/${id}/patient/${patientId}`);

            if (status != 200) {
                throw new Error(`Erro ${status} ao cadastrar o registro`);
            }

            return data;
        }
        catch (err) {
            throw err;
        }
    }
}