import { Role } from "../Authentication.service";
import { api } from "../util/Api";
import { DefaultService } from "../util/default-service";

export interface Profile {
    name: string;
    roles: Role[];
}

export class ProfileService extends DefaultService<Profile>{
    path = "/api/v1/profile"

    getRoles = async (): Promise<Role[]> => {

        try {
            const { data, status } = await api().get<Role[]>(`${this.path}/roles`);

            if (status != 200) {
                throw new Error(`Erro ${status} ao buscar as permissões`)
            }

            return data;
        }
        catch (err) {
            throw err;
        }

    }
}