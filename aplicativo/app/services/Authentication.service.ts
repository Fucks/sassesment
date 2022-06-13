import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import { api } from './Api';
import { encode as btoa } from 'base-64'

export interface Authentication {
    access_token: string;
    token_type: string;
    name: string;
    username: string;
}

interface SingInResponse {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
}

export interface AuthenticationInfo {
    password: string;
    username: string;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    enabled: boolean;
    isDisabled: boolean;
    name: string;
    email: string;
    occupation: string;
    loggedIn: Date
}

export default class AuthService {

    AUTH_KEY = "AUTHENTICATION";
    
    authentication: Authentication = null;
    
    static instance: AuthService;

    static initialize = async () => {
        AuthService.instance = new AuthService();
        await AuthService.instance.getAuthentication();
    }

    isAuthenticated = () => {
        return this.authentication != null;
    }

    getAuthentication = async () => {

        console.log('Getting authentication.', this.AUTH_KEY);
        var authenticationString = await SecureStore.getItemAsync(this.AUTH_KEY);

        if (authenticationString != null || authenticationString != "") {
            console.log('Authentication not found');

            return null;
        }

        console.log('Authentication found', authenticationString);
        return JSON.parse(authenticationString);
    }

    getToken = () => {
        return {
            token_type: this.authentication.token_type,
            access_token: this.authentication.access_token
        };
    }

    setAuthentication = async (authentication: Authentication) => {

        var authenticationToString = null;

        console.log('Setting authentication', this.AUTH_KEY)

        if (authentication != null) {
            authenticationToString = JSON.stringify(authentication);
        }

        console.log('Saving authentication', authenticationToString)

        this.authentication = authentication;
        await SecureStore.setItemAsync(this.AUTH_KEY, authenticationToString);
    }

    authenticate = async (username: string, password: string) => {

        const body = new FormData();

        body.append('grant_type', 'password');
        body.append('username', username);
        body.append('password', password);

        try {
            const response = await api().post<SingInResponse>('/oauth/token', body,
                {
                    headers: { 'Authorization': `Basic ${btoa(Constants.manifest.extra.CLIENT_ID + ':' + Constants.manifest.extra.CLIENT_SECRET)}` }
                });


            if (response.status != 200) {
                throw new Error(`Erro desconhecido. Código de resposta ${status}`)
            }

            var authentication: Authentication = {
                access_token: response.data.access_token,
                token_type: response.data.token_type,
                name: '',
                username: ''
            }

            await this.setAuthentication(authentication);

            const userInfo = await this.retrieveUserInfo();

            authentication = {
                access_token: response.data.access_token,
                token_type: response.data.token_type,
                name: userInfo.name,
                username: userInfo.username
            }

            await this.setAuthentication(authentication);

            return response.data;
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

    clear = function () {
        this.authentication = null;
        this.setAuthentication(null);
    }
}