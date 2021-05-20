import { AxiosResponse } from "axios";
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
    singIn = async (payload: SingInModel): Promise<SingInResponse> => {

        const body = new FormData();
        body.append('grant_type', 'password');
        body.append('username', payload.username);
        body.append('password', payload.password);

        try {
            const { data, status } = await api().post<SingInResponse>('/oauth/token', body,
                {
                    headers: { 'Authorization': `Basic ${btoa(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET)}` }
                });

            if (status != 200) {
                throw new Error(`Erro desconhecido. Código de resposta ${status}`)
            }

            AuthenticationService.storeToken(data);

            const userInfo = await this.retrieveUserInfo();

            AuthenticationService.storeUserInfo(userInfo);

            return data;
        }
        catch (err) {

            if (err.response.data.error_description) {

                switch (err.response.data.error_description) {
                    case 'Bad credentials':
                        throw new Error('Usuário ou senha incorretos.')
                    case 'User is disabled':
                        throw new Error('Usuário desabilitado.')
                }
            }

            throw err;
        }
    }

    retrieveUserInfo = async (): Promise<AuthenticationInfo> => {

        try {
            const { data, status } = await api().get<AuthenticationInfo>('/oauth/userinfo');

            if (status != 200) {
                throw new Error();
            }

            return data;
        }
        catch (err) {
            throw new Error('Erro ao obter dados do usuário');
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