import * as Yup from 'yup';

export default Yup.object().shape({
    name: Yup.string().required('O campo nome é obrigatório'),
    birthDate: Yup.date().required('O campo nascimento é obrigatório')
});