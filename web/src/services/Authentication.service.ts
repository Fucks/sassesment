const TOKENINFO_STORE_KEY = 'Authentication';
const USERINFO_STORE_KEY = 'UserInfo';

export default class AuthenticationService {

    static isAuthenticated = () => {
        return window.localStorage.getItem(TOKENINFO_STORE_KEY) != null;
    }

    static storeToken = (tokenInfo: any) => {
        window.localStorage.setItem(TOKENINFO_STORE_KEY, tokenInfo);
    }

    static getToken = (): string => {

        if (!AuthenticationService.isAuthenticated()) {
            return "";
        }

        return window.localStorage.getItem(TOKENINFO_STORE_KEY) as string;
    }

    static clear = () => {
        window.localStorage.removeItem(TOKENINFO_STORE_KEY);
    }

    static getUserInfo = (): any => {

        if (window.localStorage.getItem(TOKENINFO_STORE_KEY) == null) {
            throw new Error('Dados do usuário não foram encontrados na store local.')
        }

        return parseJwt(window.localStorage.getItem(TOKENINFO_STORE_KEY) as string);
    }
}

function parseJwt(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export interface AuthenticationInfo {
    authorities: string[];
    ocupation: string;
    sub: string;
    name: string;
    exp: number;
    iat: number;
    iss: string;
}
export interface Role {
    id: number;
    name: string;
    authority: string;
}