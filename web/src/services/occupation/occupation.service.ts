import { DefaultService } from "../util/default-service";

export interface Occupation {
    id?: number;
    name: string
}

// export class OccupationService {

//     create = async (entity: Occupation): Promise<Occupation> => {

//         try {
//             const { data, status } = await api().post<Occupation>('/api/v1/occupation', entity);

//             if (status != 200) {
//                 throw new Error(`Erro ${status} ao salvar a ocupação`);
//             }

//             return data;
//         }
//         catch (err) {
//             throw err;
//         }
//     }

//     update = async (id: number, entity: Occupation): Promise<Occupation> => {
//         try {
//             const { data, status } = await api().put<Occupation>(`/api/v1/occupation/${id}`, entity);

//             if (status != 200) {
//                 throw new Error(`Erro ${status} ao atualizar a ocupação`);
//             }

//             return data;
//         }
//         catch (err) {
//             throw err;
//         }
//     }

//     getById = async (id: number): Promise<Occupation> => {
//         try {
//             const { data, status } = await api().get<Occupation>(`/api/v1/occupation/${id}`);

//             if (status == 404) {
//                 throw new Error(`Ocupação não encontrada!`);
//             }

//             if (status != 200) {
//                 throw new Error(`Erro ${status} ao atualizar a ocupação`);
//             }

//             return data;
//         }
//         catch (err) {
//             throw err;
//         }
//     }

//     list = async (filter: string, page: Page): Promise<Pageable<Occupation>> => {
//         try {
//             const { data, status } = await api().get<Pageable<Occupation>>(`/api/v1/occupation/list?filter=${filter}&page=${page.page}&size=${page.size}`);

//             if (status != 200) {
//                 throw new Error(`Erro ${status} ao buscar as ocupações`);
//             }

//             return data;
//         }
//         catch (err) {
//             throw err;
//         }
//     }

//     disable = async (id: number): Promise<void> => {

//         try{
//             const {status} = await api().post<AxiosResponse>(`/api/v1/occupation/disable/${id}`)

//             if(status != 200) {
//                 throw new Error(`Erro ${status} ao desabilitar a ocupação`)
//             }

//         }
//         catch(err) {
//             throw err;
//         }
//     }
// }

export class OccupationService extends DefaultService<Occupation>{
    path = '/api/v1/occupation'
}