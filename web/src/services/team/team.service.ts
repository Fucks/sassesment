import { Patient } from "../patient/patient.service";
import { Professional } from "../professional/professional.service";
import { DefaultService } from "../util/default-service";

export interface Team {
    id?: number;
    name: string;
    professionals?: Professional[];
    patients?: Patient[];
}

export class TeamService extends DefaultService<Team>{

    path = '/api/v1/team'

}