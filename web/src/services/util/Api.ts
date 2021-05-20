import axios from "axios";
import AuthenticationService from "../Authentication.service";

const headers = () => {

    if (AuthenticationService.isAuthenticated()) {

        var token = AuthenticationService.getToken();

        return { 'Authorization': `${token.token_type} ${token.access_token}` }
    }
}

const createApi = () => {

    const api = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        timeout: 60000,
        headers: headers(),
    });

    api.interceptors.response.use(response => {

        if (response.status === 401) {
            AuthenticationService.clear();
            window.location.href = "/"
            return response;
        }
        return response;
    }, error => {
        if (error.response.status === 401) {
            AuthenticationService.clear();
            window.location.href = "/"
            return;
        }
    });

    return api;
}


export { createApi as api };