import * as Yup from 'yup';

export default Yup.object().shape({
    name: Yup.string().required("O campo nome é obrigatório"),
    professionals: Yup.array().required("Selecione pelo menos um profissional"),
    patients: Yup.array(),
})