import { AxiosResponse } from "axios";
import { api } from "../util/Api"
import { Page, Pageable } from "../util/page";

export class DefaultService<T> {

    path = "";

    create = async (entity: T): Promise<T> => {

        try {
            const { data, status } = await api().post<T>(this.path, entity);

            if (status != 200) {
                throw new Error(`Erro ${status} ao salvar o registro`);
            }

            return data;
        }
        catch (err) {
            throw err;
        }
    }

    update = async (id: number, entity: T): Promise<T> => {
        try {
            const { data, status } = await api().put<T>(`${this.path}/${id}`, entity);

            if (status != 200) {
                throw new Error(`Erro ${status} ao atualizar o registro`);
            }

            return data;
        }
        catch (err) {
            throw err;
        }
    }

    getById = async (id: number): Promise<T> => {
        try {
            const { data, status } = await api().get<T>(`${this.path}/${id}`);

            if (status == 404) {
                throw new Error(`Registro não encontrado!`);
            }

            if (status != 200) {
                throw new Error(`Erro ${status} ao atualizar o registro`);
            }

            return data;
        }
        catch (err) {
            throw err;
        }
    }

    list = async (filter: string, page: Page): Promise<Pageable<T>> => {
        try {
            const { data, status } = await api().get<Pageable<T>>(`${this.path}/list?filter=${filter}&page=${page.page}&size=${page.size}`);

            if (status != 200) {
                throw new Error(`Erro ${status} ao buscar os registros`);
            }

            return data;
        }
        catch (err) {
            throw err;
        }
    }

    disable = async (id: number): Promise<void> => {

        try{
            const {status} = await api().post<AxiosResponse>(`${this.path}/disable/${id}`)

            if(status != 200) {
                throw new Error(`Erro ${status} ao desabilitar o registro`)
            }
        }
        catch(err) {
            throw err;
        }
    }
}