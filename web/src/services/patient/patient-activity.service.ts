import { AxiosResponse } from "axios";
import { api } from "../util/Api";
import { EmptyPage } from "../util/helpers";
import { Page, Pageable } from "../util/page";

export interface ActivityApplicationType {
    id?: number;
    name: string;
}

export interface ActivityHelpType {
    id?: number;
    name: string;
}

export interface Objective {
    id?: number;
    name: string;
}

export interface Activity {
    id?: number;
    name: string;
    createdAt?: Date;
    description?: string;
    activityApplicationType: ActivityApplicationType;
    helpType: ActivityHelpType;
    retryNumber: number;
    objectives: Objective[]
}

export class PatientActivityService {

    path = "/api/v1/patient"

    listPatientActivities = async (patientId: number, page: Page): Promise<Pageable<Activity>> => {
        try {
            const { data, status } = await api().get<Pageable<Activity>>(`${this.path}/${patientId}/activities/?&page=${page.page}&size=${page.size}`);

            if (status != 200) {
                throw new Error(`Erro ${status} ao buscar os registros`);
            }

            return data;
        }
        catch (err) {
            throw err;
        }
    }

    listApplicationTypes = async (patientId: number, filter: string, page: Page): Promise<Pageable<ActivityApplicationType>> => {

        try {
            const { data, status } = await api().get<Pageable<ActivityApplicationType>>(`${this.path}/${patientId}/activities/application-types?filter=${filter}&page=${page.page}&size=${page.size}`);

            if (status != 200) {
                throw new Error(`Erro ${status} ao buscar os registros`);
            }

            return data;
        }
        catch (err) {
            throw err
        }
    }

    listHelpTypes = async (patientId: number, filter: string, page: Page): Promise<Pageable<ActivityHelpType>> => {

        try {
            const { data, status } = await api().get<Pageable<ActivityHelpType>>(`${this.path}/${patientId}/activities/help-types?filter=${filter}&page=${page.page}&size=${page.size}`);

            if (status != 200) {
                throw new Error(`Erro ${status} ao buscar os registros`);
            }

            return data;
        }
        catch (err) {
            throw err
        }
    }

    create = async (patientId: number, activity: Activity): Promise<Activity> => {
        try {
            const { data, status } = await api().post<Activity>(`${this.path}/${patientId}/activities/`, activity);

            if (status != 200) {
                throw new Error(`Erro ${status} ao salvar o registro`);
            }

            return data;
        }
        catch (err) {
            throw err
        }
    }

    disable = async (patientId: number, activityId: number): Promise<void> => {
        try {
            const { status } = await api().post<AxiosResponse>(`${this.path}/${patientId}/activities/disable/${activityId}`)

            if (status != 200) {
                throw new Error(`Erro ${status} ao desabilitar o registro`)
            }
        }
        catch (err) {
            throw err;
        }
    }
}