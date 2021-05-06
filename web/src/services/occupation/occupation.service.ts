import { api } from "../util/Api"

export interface Occupation {
    name: string
}

export class OccupationService {

    create = async (entity: Occupation): Promise<Occupation> => {

        try {
            const { data, status } = await api().post<Occupation>('/api/occupation/v1', entity);

            if (status != 200) {
                throw new Error(`Erro ${status} ao salvar a ocupação`);
            }

            return data;
        }
        catch (err) {
            throw err;
        }
    }

    update = async (id: number, entity: Occupation): Promise<Occupation> => {
        try {
            const { data, status } = await api().put<Occupation>(`/api/occupation/v1/${id}`, entity);

            if (status != 200) {
                throw new Error(`Erro ${status} ao atualizar a ocupação`);
            }

            return data;
        }
        catch (err) {
            throw err;
        }
    }

    getById = async (id: number): Promise<Occupation> => {
        try {
            const { data, status } = await api().get<Occupation>(`/api/occupation/v1/${id}`);

            if(status == 404) {
                throw new Error(`Ocupação não encontrada!`);
            }

            if (status != 200) {
                throw new Error(`Erro ${status} ao atualizar a ocupação`);
            }

            return data;
        }
        catch (err) {
            throw err;
        }
    }

    list = async (page: number, size: number) => {
        try {
            const { data, status } = await api().get<Occupation>(`/api/occupation/v1/list?page=${page}&size=${size}`);

            if (status != 200) {
                throw new Error(`Erro ${status} ao buscar as ocupações`);
            }

            return data;
        }
        catch (err) {
            throw err;
        }
    }
}