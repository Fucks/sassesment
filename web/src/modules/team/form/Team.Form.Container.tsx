import Banner from "@atlaskit/banner";
import { FormSection } from "@atlaskit/form";
import { Formik } from "formik";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ConfirmDisableDialog from "../../../components/confirm-disable-dialog/ConfirmDisableDialog";
import FormField from "../../../components/form-field/FormField";
import FormContainerLayout from "../../../components/layout/FormContainerLayout";
import { PatientService } from "../../../services/patient/patient.service";
import ProfessionalService from "../../../services/professional/professional.service";
import { TeamService } from "../../../services/team/team.service";
import TeamSchema from "./Team.Schema";
import ErrorIcon from '@atlaskit/icon/glyph/error';
import styled from "styled-components";
import AsyncSelect from "../../../components/select/AsyncSelect";
import { FormEntity, TeamParser } from "../../../services/team/team-parser.service";
import { ActionItem, SvgSaveIcon } from "../../../components/page-header/PageHeader";
import Icon from "@atlaskit/icon";

export interface TeamFormContainerProps {
}

const TeamFormContainer: FunctionComponent<TeamFormContainerProps> = (props) => {

    const service = useMemo(() => new TeamService(), []);
    const professionalService = useMemo(() => new ProfessionalService(), []);
    const patientService = useMemo(() => new PatientService(), []);
    const parser = useMemo(() => new TeamParser(), []);

    const { id } = useParams<any>();

    const breacrumbs = ["Equipes", "Formulário", id ? 'Editar' : 'Cadastrar'];

    const FormTitle = (
        id ? 'Editar equipe' : 'Cadastrar nova equipe'
    );

    const [formValues, setFormValues] = useState<FormEntity>({ name: '', patients: [], professionals: [] });
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

        setFormValues(parser.parseEntityToFormModel(data));

        setSubmiting(false);
    }

    const handleSave = async (values: FormEntity) => {

        setSubmiting(true);

        try {

            const _entity = parser.parseFormModelToEntity(values);

            if (id != null) {
                await service.update(id, _entity);
            }
            else {
                await service.create(_entity);
            }

            await new Promise((resolve) => { setTimeout(() => { history.push('/team'); resolve(null) }, 3000) })
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
            await new Promise((resolve) => setTimeout(() => { history.push('/team'); resolve(null) }, 1000))
        }
        catch (err) {
            setError(err);
            setShowDisablePopup(false);
        }
    }

    const handleProfessionals = async (filter: string) => {

        let professionals;

        try {
            professionals = await professionalService.list(filter, { page: 0, size: 10 });
        }
        catch (err) {
            setError(err);
            return [];
        }

        return professionals.content.map(e => ({ label: e.name, value: e }))
    }

    const handlePatients = async (filter: string) => {

        let patient;

        try {
            patient = await patientService.list(filter, { page: 0, size: 10 });
        }
        catch (err) {
            setError(err);
            return [];
        }

        return patient.content.map(e => ({ label: e.name, value: e }))
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
            icon: <Icon glyph={SvgSaveIcon} label="" size="small" primaryColor="#172B4D"  />,
            label: 'Salvar'
        }
    ].filter(e => e), [submiting]);

    const form = {
        initialValues: formValues,
        validationSchema: TeamSchema,
        enableReinitialize: true,
        onSubmit: handleSave,
    }

    return (<Formik {...form} >
        {(formProps) => (
            <form onSubmit={formProps.handleSubmit} style={{ flex: 1 }}>
                <FormContainerLayout
                    title={FormTitle}
                    onBackAction={() => history.goBack()}
                    actions={actions}
                    breadcrumbs={breacrumbs}>
                    {error &&
                        <Banner
                            appearance="error"
                            icon={<ErrorIcon label="" secondaryColor="inherit" />}
                            isOpen>
                            {(error as any).message}
                        </Banner>
                    }
                    <div>
                        <FormSection title="Dados da Equipe">
                            <div className="row">
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    <FormField name="name" value={formValues.name} label="Nome da equipe" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    <AsyncSelect fetch={handlePatients} label="Pacientes" name="patients" required isMulti={true} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    <AsyncSelect fetch={handleProfessionals} label="Profissionais" name="professionals" required isMulti={true} />
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
export default TeamFormContainer;

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
`;