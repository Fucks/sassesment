import { Occupation } from "../occupation/occupation.service";
import { Profile } from "../profile/profile.service";
import { DefaultService } from "../util/default-service";

export interface Professional {
    id?: number;
    name: string;
    email: string;
    password?: string;
    occupation?: Occupation;
    profile?: Profile;
}

export default class ProfessionalService extends DefaultService<Professional>{

    path = '/api/v1/professional'

 }