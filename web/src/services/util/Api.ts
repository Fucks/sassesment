import axios from "axios";
import AuthenticationService from "../Authentication.service";

const headers = () => {

    if (AuthenticationService.isAuthenticated()) {

        var token = AuthenticationService.getToken();

        return { 'Authorization': `${token.token_type} ${token.access_token}` }
    }
}

const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

function isIsoDateString(value: any): boolean {
    return value && typeof value === "string" && isoDateFormat.test(value);
}

export function handleDates(body: any) {
    if (body === null || body === undefined || typeof body !== "object")
        return body;

    for (const key of Object.keys(body)) {
        const value = body[key];
        if (isIsoDateString(value)) body[key] = new Date(value);
        else if (typeof value === "object") handleDates(value);
    }
}

const createApi = () => {

    const api = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        timeout: 60000,
        headers: headers(),
    });

    api.interceptors.request.use((config) => {
        config.paramsSerializer = (params) => JSON.stringify(params)
        return config;
    })

    api.interceptors.response.use(originalResponse => {
        handleDates(originalResponse.data);
        return originalResponse;
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

        return error.response;
    });

    return api;
}


export { createApi as api };