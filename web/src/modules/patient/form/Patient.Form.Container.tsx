import React, { FunctionComponent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { PatientService, Patient } from '../../../services/patient/patient.service';
import Button, { LoadingButton } from '@atlaskit/button';
import PatientSchema from './Patient.Schema';
import { Formik } from 'formik';
import FormContainerLayout from "../../../components/layout/FormContainerLayout";
import Banner from '@atlaskit/banner'
import ErrorIcon from '@atlaskit/icon/glyph/error';
import FormField from "../../../components/form-field/FormField";
import ConfirmDisableDialog from "../../../components/confirm-disable-dialog/ConfirmDisableDialog";
import styled from "styled-components";
import { Label } from '@atlaskit/field-base';
import { DatePicker } from '@atlaskit/datetime-picker';
import { FormSection } from "@atlaskit/form";

export interface PatientFormContainerProps {
}

const PatientFormContainer: FunctionComponent<PatientFormContainerProps> = () => {

    const service = new PatientService();

    const { id } = useParams<any>();

    const breacrumbs = ["Pacientes", "Formulário", id ? 'Editar' : 'Cadastrar'];

    const FormTitle = (
        id ? 'Editar paciente' : 'Cadastrar novo paciente'
    );

    const [formValues, setFormValues] = useState<Patient>({ name: '', birthDate: new Date() });
    const [submiting, setSubmiting] = useState(false);

    const [error, setError] = useState<any | null>(null);
    const [showDisablePopup, setShowDisablePopup] = useState(false);

    const history = useHistory();

    useEffect(() => {

        if (id != null) {
            initFormWithValues();
        }

    }, []);

    const initFormWithValues = async () => {

        setSubmiting(true);

        var data = await service.getById(id);

        setFormValues(data);

        setSubmiting(false);
    }

    const handleSave = async (values: Patient) => {

        setSubmiting(true);

        try {

            if (id != null) {
                await service.update(id, values);
            }
            else {
                await service.create(values);
            }

            await new Promise((resolve) => { setTimeout(() => { history.push('/patient'); resolve(null) }, 3000) })
        }
        catch (err) {
            setError(err);
        }
        finally {
            setSubmiting(false);
        }
    }

    const handleDisableEntity = async () => {

        try {
            await service.disable(id);
            await new Promise((resolve) => setTimeout(() => { history.push('/patient'); resolve(null) }, 1000))
        }
        catch (err) {
            setError(err);
            setShowDisablePopup(false);
        }
    }

    const actions = (
        <Actions>
            {id && <Button onClick={() => setShowDisablePopup(true)} appearance="danger">Desativar</Button>}
            <LoadingButton type="submit" appearance="primary" isLoading={submiting}>Salvar</LoadingButton>
        </Actions>
    )

    const form = {
        initialValues: formValues,
        validationSchema: PatientSchema,
        enableReinitialize: true,
        onSubmit: handleSave
    }

    return (
        <Formik  {...form}>
            {(props) => (
                <form onSubmit={props.handleSubmit}>
                    <FormContainerLayout
                        title={FormTitle}
                        onBackAction={() => history.goBack()}
                        saveButton={actions}
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
                            <FormSection title="Dados pessoais">
                                <FormField name="name" value={formValues.name} label="Nome do paciente" />
                                <Label htmlFor="react-select-datepicker--input" label="Data de nascimento" />
                                <DatePicker
                                    id="datepicker"
                                    name="birthDate"
                                    value={props.getFieldProps('birthDate').value}
                                    onChange={props.getFieldHelpers('birthDate').setValue}
                                    locale={'pt-BR'}
                                    testId={'datePicker'}
                                />
                            </FormSection>
                        </Content>
                        <ConfirmDisableDialog isOpen={showDisablePopup} onClose={() => setShowDisablePopup(false)} onConfirm={handleDisableEntity} />
                    </FormContainerLayout>
                </form>
            )}
        </Formik>
    );
}

export default PatientFormContainer;

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
`;

const Content = styled.div`
    padding: 0 64px;
    flex-direction: column;
    width: 40%;
`;