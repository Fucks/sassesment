import { api } from "../util/Api"
import AuthenticationService, { AuthenticationInfo } from "../Authentication.service";

export interface SingInModel {
    username: string;
    password: string;
}

export interface SingInResponse {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
}

export class Constants {
    static TOKEN_EXPIRATION_SECONDS = 50000
}

export class LoginService {
    singIn = async (payload: SingInModel): Promise<string> => {

        const body = new FormData();
        body.append('username', payload.username);
        body.append('password', payload.password);

        try {
            const { data, status } = await api().post<string>('/sign-in', body);

            if (status != 200) {
                throw new Error(`Erro desconhecido. Código de resposta ${status}`)
            }

            AuthenticationService.storeToken(data);

            return data;
        }
        catch (err) {
            throw err;
        }
    }

    checkToken = async (): Promise<void> => {

        try {
            const { data, status } = await api().get('/oauth/userinfo/check-token');

            if (status != 200) {
                throw new Error();
            }

            return;
        }
        catch (err) {
            throw new Error('Erro ao obter dados do usuário');
        }

    }
}