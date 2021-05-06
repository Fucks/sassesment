import { Field } from "@atlaskit/form";
import { Formik, FormikValues, useFormik } from "formik";
import { FunctionComponent, useState } from "react";
import { useHistory, useParams } from "react-router";
import FormContainerLayout from "../../../components/layout/FormContainerLayout";
import OccupationSchema from "./Occupation.schema";
import TextField from '@atlaskit/textfield';
import styled from "styled-components";
import { LoadingButton } from "@atlaskit/button";
import { Occupation, OccupationService } from "../../../services/occupation/occupation.service";
import Flag from '@atlaskit/flag';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import { R400 } from '@atlaskit/theme/colors';
import Banner from "@atlaskit/banner";
import FormField from "../../../components/form-field/FormField";

export interface OccupationFormContainerProps {

}

const OccupationFormContainer: FunctionComponent<OccupationFormContainerProps> = () => {

    const service = new OccupationService();

    const { id } = useParams<any>();

    const breacrumbs = ["Ocupações", "Formulário", id ? 'Editar' : 'Cadastrar'];

    const FormTitle = (
        id ? 'Editar ocupação' : 'Cadastrar nova ocupação'
    );

    const [formValues, setFormValues] = useState({ name: '' });
    const [submiting, setSubmiting] = useState(false);

    const [error, setError] = useState(null);

    const history = useHistory();

    const handleSave = async (values: Occupation) => {

        setSubmiting(true);

        try {
            service.create(values);

            await setTimeout(() => history.push('/occupation'))
        }
        catch (err) {
            setError(err);
        }
        finally {
            setSubmiting(false)
        }
    }

    const form = {
        initialValues: formValues,
        validationSchema: OccupationSchema,
        onSubmit: (values: FormikValues) => {
            handleSave(values as Occupation)
        }
    }

    return (
        <Formik {...form}>
            {(props) => (
                <form onSubmit={props.handleSubmit}>
                    <FormContainerLayout
                        title={FormTitle}
                        onBackAction={() => history.goBack()}
                        saveButton={<LoadingButton type="submit" appearance="primary" isLoading={submiting}> Salvar </LoadingButton>}
                        breadcrumbs={breacrumbs}>
                        {error &&
                            <Banner
                                appearance="error"
                                icon={<ErrorIcon label="" secondaryColor="inherit" />}
                                isOpen>
                                {(error as any).message}
                            </Banner>
                        }
                        <Content>

                            <FormField name="name" label="Nome da ocupação"></FormField>

                            {/* <Field name="name" label="Nome da ocupação" isRequired>
                        {({ fieldProps }) => {
                            return <TextField {...fieldProps} />
                        }}
                    </Field> */}
                        </Content>

                    </FormContainerLayout>
                </form>
            )}

        </Formik>
    );
}

export default OccupationFormContainer;

const Content = styled.div`
    padding: 0 32px;
    flex-direction: column;
    width: 40%;
`;