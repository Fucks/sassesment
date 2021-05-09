import * as Yup from 'yup';

export default Yup.object().shape({
    name: Yup.string().required("O campo nome é obrigatório"),
    email: Yup.string().required("O campo email é obrigatório"),
    occupation: Yup.object(),
    profile: Yup.object(),
    password: Yup.string(),
    confirmPassword: Yup.string().when('password', { is: (password: string) => password && password.length > 0, then: Yup.string().required('Confirme a senha').oneOf([Yup.ref('password')], 'As senhas devem ser iguais') })
})