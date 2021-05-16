import { FunctionComponent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import FormContainerLayout from "../../../components/layout/FormContainerLayout";
import styled from "styled-components";
import Button, { LoadingButton } from "@atlaskit/button";
import ErrorIcon from '@atlaskit/icon/glyph/error';
import Banner from "@atlaskit/banner";
import FormField from "../../../components/form-field/FormField";
import ConfirmDisableDialog from "../../../components/confirm-disable-dialog/ConfirmDisableDialog";
import { Formik } from "formik";
import ProfessionalService, { Professional } from "../../../services/professional/professional.service";
import { FormSection } from "@atlaskit/form";
import { OccupationService } from "../../../services/occupation/occupation.service";
import AsyncSelect from "../../../components/select/AsyncSelect";
import { ProfileService } from "../../../services/profile/profile.service";
import ProfessionalSchema from "./Professional.Schema";

export interface ProfessionalFormContainerProps {
}

const ProfessionalFormContainer: FunctionComponent<ProfessionalFormContainerProps> = (props) => {

    const service = new ProfessionalService();
    const occupationService = new OccupationService();
    const profileService = new ProfileService();

    const { id } = useParams<any>();

    const breacrumbs = ["Profissionais", "Formulário", id ? 'Editar' : 'Cadastrar'];

    const FormTitle = (
        id ? 'Editar profissional' : 'Cadastrar novo profissional'
    );

    const [formValues, setFormValues] = useState<Professional>({ name: '', email: '', });
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

    const handleSave = async (values: Professional) => {

        setSubmiting(true);

        try {

            if (id != null) {
                await service.update(id, values);
            }
            else {
                await service.create(values);
            }

            await new Promise((resolve) => { setTimeout(() => { history.push('/professional'); resolve(null) }, 3000) })
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
            await new Promise((resolve) => setTimeout(() => { history.push('/professional'); resolve(null) }, 1000))
        }
        catch (err) {
            setError(err);
            setShowDisablePopup(false);
        }
    }

    const handleOccupations = async (filter: string) => {

        let occupations;

        try {
            occupations = await occupationService.list(filter, { page: 0, size: 10 });
        }
        catch (err) {
            setError(err);
            return [];
        }

        return occupations.content.map(e => ({ label: e.name, value: e }))
    }

    const handleProfiles = async (filter: string) => {
        let profiles;

        try {
            profiles = await profileService.list(filter, { page: 0, size: 10 });
        }
        catch (err) {
            setError(err);
            return []
        }

        return profiles.content.map(e => ({ label: e.name, value: e }));
    }

    const actions = (
        <Actions>
            {id && <Button onClick={() => setShowDisablePopup(true)} appearance="danger">Desativar</Button>}
            <LoadingButton type="submit" appearance="primary" isLoading={submiting}>Salvar</LoadingButton>
        </Actions>
    )

    const form = {
        initialValues: formValues,
        validationSchema: ProfessionalSchema,
        enableReinitialize: true,
        onSubmit: handleSave
    }

    return (
        <Formik {...form} >
            {(formProps) => (
                <form onSubmit={formProps.handleSubmit}>
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
                                <FormField name="name" value={formValues.name} label="Nome do profissional" required />
                            </FormSection>

                            <FormSection title="Dados profissionais">
                                <AsyncSelect fetch={handleOccupations} label="Ocupação" name="occupation" />
                            </FormSection>

                            <FormSection title="Dados de acesso" >
                                <FormField name="email" value={formValues.email} label="Email" required />
                                <AsyncSelect fetch={handleProfiles} label="Perfil de acesso" name="profile" />
                                <FormField type="password" name="password" value="" label="Senha" />
                                <FormField type="password" name="confirmPassword" value="" label="Confirmar senha" />
                            </FormSection>

                        </Content>
                        <ConfirmDisableDialog isOpen={showDisablePopup} onClose={() => setShowDisablePopup(false)} onConfirm={handleDisableEntity} />
                    </FormContainerLayout>
                </form>
            )}
        </Formik>
    );

}

export default ProfessionalFormContainer;

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