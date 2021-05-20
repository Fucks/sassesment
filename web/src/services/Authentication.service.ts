const TOKENINFO_STORE_KEY = 'Authentication';
const USERINFO_STORE_KEY = 'UserInfo';

export default class AuthenticationService {

    static isAuthenticated = () => {
        return window.localStorage.getItem(TOKENINFO_STORE_KEY) != null;
    }

    static storeToken = (tokenInfo: any) => {
        window.localStorage.setItem(TOKENINFO_STORE_KEY, JSON.stringify(tokenInfo));
    }

    static getToken = () => {

        if (!AuthenticationService.isAuthenticated()) {
            return null;
        }

        return JSON.parse(window.localStorage.getItem(TOKENINFO_STORE_KEY) as string);
    }

    static clear = () => {
        window.localStorage.removeItem(TOKENINFO_STORE_KEY);
        window.localStorage.removeItem(USERINFO_STORE_KEY);
    }

    static storeUserInfo = (userInfo: AuthenticationInfo) => {
        userInfo.loggedIn = new Date();
        window.localStorage.setItem(USERINFO_STORE_KEY, JSON.stringify(userInfo));
    }

    static getUserInfo = (): AuthenticationInfo => {

        if (window.localStorage.getItem(USERINFO_STORE_KEY) == null) {
            throw new Error('Dados do usuário não foram encontrados na store local.')
        }

        return JSON.parse(window.localStorage.getItem(USERINFO_STORE_KEY) as string);
    }
}

export interface AuthenticationInfo {
    password: string;
    username: string;
    authorities: Role[];
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    enabled: boolean;
    isDisabled: boolean;
    name: string;
    email: string;
    occupation: string;
    loggedIn:Date
}

export interface Role {
    id: number;
    name: string;
    authority: string;
}