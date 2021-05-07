import { Fragment, FunctionComponent, useState } from "react";
import Form, { CheckboxField, Field, FormFooter } from "@atlaskit/form";
import TextField from '@atlaskit/textfield';
import Checkbox from "@atlaskit/checkbox";
import { ButtonGroup, LoadingButton } from "@atlaskit/button";
import styled from "styled-components";
import { LoginService } from "../../services/login/login.service";
import { useHistory } from "react-router";
import Banner from "@atlaskit/banner";
import ErrorIcon from '@atlaskit/icon/glyph/error';

const LoginContainer: FunctionComponent = () => {

    const loginService = new LoginService();
    const [submiting, setSubmiting] = useState(false);
    const [error, setError]: any | null = useState(null);
    const history = useHistory();

    const handleSubmit = async (values: any) => {

        setSubmiting(true);

        try {
            await loginService.singIn(values);
            await setTimeout(() => {
                history.push('/');
            }, 3000)

        }
        catch (err) {
            console.error(`Erro ao tentar logar. Erro: ${err}`)
            setError(err);
        }
        finally {
            
        }

    }

    return <Container>
        <Form onSubmit={handleSubmit}>
            {({ formProps }) => (
                <form {...formProps}>
                    <LoginContent>
                        {error != null &&
                            <Banner
                                appearance="error"
                                icon={<ErrorIcon label="" secondaryColor="inherit" />}
                                isOpen>
                                {error?.message}
                            </Banner>
                        }
                        <Field
                            name="username"
                            label="Usuário"
                            defaultValue="administracao@somare.com.br"
                            isRequired>
                            {({ fieldProps, error }) => (
                                <Fragment>
                                    <TextField autoComplete="off" {...fieldProps} />
                                </Fragment>
                            )}
                        </Field>

                        <Field
                            name="password"
                            label="Senha"
                            defaultValue="123456"
                            isRequired>
                            {({ fieldProps, error }) => (
                                <Fragment>
                                    <TextField autoComplete="off" type="password" {...fieldProps} />
                                </Fragment>
                            )}
                        </Field>

                        <CheckboxField name="remember" label="Lembrar-me" defaultIsChecked>
                            {({ fieldProps }) => (
                                <Checkbox {...fieldProps} label="Always sign in on this device" />
                            )}
                        </CheckboxField>

                        <FormFooter>
                            <ButtonGroup>
                                <LoadingButton
                                    type="submit"
                                    appearance="primary"
                                    isLoading={submiting}>
                                    Entrar
                                </LoadingButton>
                            </ButtonGroup>
                        </FormFooter>
                    </LoginContent>
                </form>
            )}
        </Form>
    </Container>
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: rgb(7, 71, 166);
`;

const LoginContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    margin-top: -50%;
    background: white;
    padding: 48px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px
`;


export default LoginContainer;