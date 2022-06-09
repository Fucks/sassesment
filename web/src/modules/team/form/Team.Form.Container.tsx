import Banner from "@atlaskit/banner";
import Button, { LoadingButton } from "@atlaskit/button";
import { FormSection } from "@atlaskit/form";
import { Actions } from "@atlaskit/modal-dialog/dist/types/internal/styles/content";
import { Formik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ConfirmDisableDialog from "../../../components/confirm-disable-dialog/ConfirmDisableDialog";
import FormField from "../../../components/form-field/FormField";
import FormContainerLayout from "../../../components/layout/FormContainerLayout";
import { Content } from "../../../components/layout/ListContainerLayout";
import { Patient, PatientService } from "../../../services/patient/patient.service";
import ProfessionalService, { Professional } from "../../../services/professional/professional.service";
import { Team, TeamService } from "../../../services/team/team.service";
import TeamSchema from "./Team.Schema";
import ErrorIcon from '@atlaskit/icon/glyph/error';

export interface TeamFormContainerProps {
}

interface FormEntity {
    name: string;
    professionals: Professional[];
    patients: Patient[]
}

const TeamFormContainer: FunctionComponent<TeamFormContainerProps> = (props) => {

    const service = new TeamService();
    const professionalService = new ProfessionalService();
    const patientService = new PatientService();

    const { id } = useParams<any>();

    const breacrumbs = ["Equipes", "Formulário", id ? 'Editar' : 'Cadastrar'];

    const FormTitle = (
        id ? 'Editar equipe' : 'Cadastrar nova equipe'
    );

    const [formValues, setFormValues] = useState<Team>({ name: ''});
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

    const handleSave = async (values: Team) => {

        setSubmiting(true);

        try {

            if (id != null) {
                await service.update(id, values);
            }
            else {
                await service.create(values);
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

    const actions = (
        <Actions>
            {id && <Button onClick={() => setShowDisablePopup(true)} appearance="danger">Desativar</Button>}
            <LoadingButton type="submit" appearance="primary" isLoading={submiting}>Salvar</LoadingButton>
        </Actions>
    )

    const form = {
        initialValues: formValues,
        validationSchema: TeamSchema,
        enableReinitialize: true,
        onSubmit: handleSave
    }

	return (<Formik {...form} >
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
                            <FormSection title="Dados da Equipe">
                                <FormField name="name" value={formValues.name} label="Nome da equipe" required />
                            </FormSection>
                        </Content>
                        <ConfirmDisableDialog isOpen={showDisablePopup} onClose={() => setShowDisablePopup(false)} onConfirm={handleDisableEntity} />
                    </FormContainerLayout>
                </form>
            )}
        </Formik>
    );
}
export default TeamFormContainer;