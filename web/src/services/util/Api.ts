import axios from "axios";
import AuthenticationService from "../Authentication.service";

const headers = () => {

    if (AuthenticationService.isAuthenticated()) {

        var token = AuthenticationService.getToken();

        return { 'Authorization': `${token.token_type} ${token.access_token}` }
    }
}

const createApi = () => axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 1000,
    headers: headers()
});

export { createApi as api };