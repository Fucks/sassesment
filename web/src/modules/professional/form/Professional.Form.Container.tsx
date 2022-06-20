import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Formik } from "formik";
import { FormSection } from "@atlaskit/form";
import { OccupationService } from "../../../services/occupation/occupation.service";
import { ProfileService } from "../../../services/profile/profile.service";
import { ProfessionalFormModel, ProfessionalParserAdapter } from "../../../services/professional/professional-parser.service";
import { ActionItem, SvgSaveIcon } from "../../../components/page-header/PageHeader";
import FormContainerLayout from "../../../components/layout/FormContainerLayout";
import styled from "styled-components";
import ErrorIcon from '@atlaskit/icon/glyph/error';
import Banner from "@atlaskit/banner";
import FormField from "../../../components/form-field/FormField";
import ConfirmDisableDialog from "../../../components/confirm-disable-dialog/ConfirmDisableDialog";
import Icon from "@atlaskit/icon";
import ProfessionalService from "../../../services/professional/professional.service";
import ProfessionalSchema from "./Professional.Schema";
import AsyncSelect from "../../../components/select/AsyncSelect";

export interface ProfessionalFormContainerProps {
}

const ProfessionalFormContainer: FunctionComponent<ProfessionalFormContainerProps> = (props) => {

    const service = useMemo(() => new ProfessionalService(), []);
    const occupationService = useMemo(() => new OccupationService(), []);
    const profileService = useMemo(() => new ProfileService(), []);
    const parser = useMemo(() => new ProfessionalParserAdapter(), []);

    const { id } = useParams<any>();

    const breacrumbs = ["Profissionais", "Formulário", id ? 'Editar' : 'Cadastrar'];

    const FormTitle = (
        id ? 'Editar profissional' : 'Novo profissional'
    );

    const [formValues, setFormValues] = useState<ProfessionalFormModel>({} as ProfessionalFormModel);
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

        setFormValues(parser.serializeTo(data));

        setSubmiting(false);
    }

    const handleSave = async (values: ProfessionalFormModel) => {

        setSubmiting(true);

        try {

            if (id != null) {
                await service.update(id, parser.serializeFrom(values));
            }
            else {
                await service.create(parser.serializeFrom(values));
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

    const actions: ActionItem[] = useMemo(() => [
        id && {
            onClick: () => setShowDisablePopup(true),
            appearance: "danger",
            label: 'Desativar'
        },
        {
            type: "submit",
            appearance: "primary",
            isLoading: submiting,
            icon: <Icon glyph={SvgSaveIcon} label="" size="small" primaryColor="#172B4D" />,
            label: 'Salvar'
        }
    ].filter(e => e), [submiting]);


    const form = {
        initialValues: formValues as ProfessionalFormModel,
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
                        actions={actions}
                        breadcrumbs={breacrumbs}>
                        {error &&
                            <Banner
                                appearance="error"
                                icon={<ErrorIcon label="" secondaryColor="inherit" />}
                                isOpen={true}>
                                {(error as any).message}
                            </Banner>
                        }
                        <div>
                            <FormSection title="Dados pessoais">
                                <div className="row">
                                    <div className="col-lg-6 col-md-12">
                                        <FormField name="name" value={formProps.initialValues?.name} label="Nome do profissional" required />
                                    </div>
                                </div>
                            </FormSection>

                            <FormSection title="Dados profissionais">
                                <div className="row">
                                    <div className="col-lg-6 col-md-12">
                                        <AsyncSelect fetch={handleOccupations} label="Ocupação" name="occupation" />
                                    </div>
                                </div>
                            </FormSection>

                            <FormSection title="Dados de acesso" >
                                <div className="row">
                                    <div className="col-lg-6 col-md-12">
                                        <FormField name="email" value={formProps.initialValues?.email} label="Email" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 col-md-12">
                                        <AsyncSelect fetch={handleProfiles} label="Perfil de acesso" name="profile" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 col-md-12">
                                        <FormField type="password" name="password" value="" label="Senha" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 col-md-12">
                                        <FormField type="password" name="confirmPassword" value="" label="Confirmar senha" />
                                    </div>
                                </div>
                            </FormSection>

                        </div>
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