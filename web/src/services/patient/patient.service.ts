import { Team } from "../team/team.service";
import { api } from "../util/Api";
import { DefaultService } from "../util/default-service";

export interface Patient {
    id?: number;
    name: string;
    birthDate: Date;
}

export class PatientService extends DefaultService<Patient> {
    path = '/api/v1/patient'

    fetchTeams = async (id: number) : Promise<Team[]> => {

        try {
            const { data, status } = await api().get<Team[]>(`${this.path}/${id}/teams`);

            if (status != 200) {
                throw new Error(`Erro ${status} ao buscar os registros`);
            }

            return data;
        }
        catch (err) {
            throw err;
        }
    }
}