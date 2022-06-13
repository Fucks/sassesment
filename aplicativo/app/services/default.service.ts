import { api } from "./Api";
import { Page, Pageable } from "./page";

export class DefaultService<T> {
    path = "";

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
}