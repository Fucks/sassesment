import axios from "axios";
import Constants from "expo-constants";
import AuthService from "./Authentication.service";

const headers = () => {

    if (AuthService.instance.isAuthenticated()) {

        var token = AuthService.instance.getToken();

        return { 'Authorization': `${token.token_type} ${token.access_token}` }
    }
}

const createApi = () => {

    const api = axios.create({
        baseURL: Constants.manifest.extra.WS_URL,
        timeout: 60000,
        headers: headers(),
    });

    api.interceptors.response.use(response => {

        if (response.status === 401) {
            AuthService.instance.clear();
            window.location.href = "/"
            return response;
        }
        return response;
    }, error => {

        if (error.response.status === 401) {
            AuthService.instance.clear();
        }

        throw error;

    });

    return api;
}


export { createApi as api };