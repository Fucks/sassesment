import { Formik } from "formik";
import { FunctionComponent, useState } from "react";
import * as Yup from 'yup';
import { Activity, PatientActivityService } from "../../../../services/patient/patient-activity.service";
import Modal from '@atlaskit/modal-dialog'
import FormField from "../../../../components/form-field/FormField";
import AsyncSelect from "../../../../components/select/AsyncSelect";
import { Patient } from "../../../../services/patient/patient.service";
import TextArea from "../../../../components/form-field/TextArea";
import TagsInputSelec from "../../../../components/select/TagsInputSelect";
import Banner from "@atlaskit/banner";
import ErrorIcon from '@atlaskit/icon/glyph/error';
import styled from "styled-components";
import moment from "moment";
import Button from "@atlaskit/button";
import TrashIcon from '@atlaskit/icon/glyph/trash';
import ConfirmDisableDialog from "../../../../components/confirm-disable-dialog/ConfirmDisableDialog";

export interface ActivityFormProps {
    activity?: Activity,
    patient: Patient,
    onClose: (activity: Activity | null) => void
}

const ActivityForm: FunctionComponent<ActivityFormProps> = ({ activity, patient, onClose }) => {

    const service = new PatientActivityService();

    const title = activity != null ? 'Editar atividade' : 'Criar nova atividade';

    const [error, setError] = useState();
    const [showDisablePopup, setShowDisablePopup] = useState(false);

    const handleSubmit = async (activity: Activity) => {

        try {
            const response = await service.create(patient.id as number, activity);
            onClose(response);
        }
        catch (err) {
            setError(err);
        }
    }

    const handleApplicationType = async (filter: string) => {
        let applicationTypes;

        try {
            applicationTypes = await service.listApplicationTypes(patient.id as number, filter, { page: 0, size: 10 });
        }
        catch (err) {
            setError(err);
            throw err;
        }

        return applicationTypes.content.map(e => ({ label: e.name, value: e }));
    }

    const handleHelpType = async (filter: string) => {
        let helpTypes;

        try {
            helpTypes = await service.listHelpTypes(patient.id as number, filter, { page: 0, size: 10 });
        }
        catch (err) {
            setError(err);
            throw err;
        }

        return helpTypes.content.map(e => ({ label: e.name, value: e }));
    }

    const handleDisableEntity = async () => {

        try {
            await service.disable(patient?.id as number, activity?.id as number);
            onClose(null);
        }
        catch (err) {
            setError(err);
            setShowDisablePopup(false);
        }
    }

    const createdAtLabel = () => {

        if (!activity?.createdAt) {
            return null;
        }

        return <CreatedAtLabel>
            Criado em: {moment(activity?.createdAt).format('DD/MM/YYYY HH:mm')}
        </CreatedAtLabel>

    }

    const form = {
        initialValues: activity || {
            name: '', activityApplicationType: { name: '' }, helpType: { name: '' }, retryNumber: 1, objectives: []
        },
        validationSchema: schema,
        enableReinitialize: true,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: handleSubmit
    }

    return (
        <Modal
            actions={[
                { text: 'Salvar', appearance: 'primary', type: 'submit', form: "activity" },
                { text: 'Cancelar', onClick: () => onClose(null) },
            ]}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEscapePress={false}
            onClose={() => onClose(null)}
            height="1200px"
            heading={
                <div>
                    <Header>{title}</Header>
                    {createdAtLabel()}
                    {activity?.id && <DeleteButton onClick={() => setShowDisablePopup(true)} appearance="danger" iconAfter={<TrashIcon label="" />} />}
                </div>
            } >
            <Formik {...form}>
                {(formProps) => (
                    <form id="activity" onSubmit={formProps.handleSubmit}>
                        {error &&
                            <Banner
                                appearance="error"
                                icon={<ErrorIcon label="" secondaryColor="inherit" />}
                                isOpen>
                                {(error as any).message}
                            </Banner>
                        }
                        <FormField name="name" label="Nome da atividade" required value={form.initialValues.name} />
                        <AsyncSelect fetch={handleApplicationType} label="Tipo de aplicação" name="activityApplicationType" />
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gridGap: '16px'
                        }}>
                            <AsyncSelect fetch={handleHelpType} label="Tipo de ajuda" name="helpType" />
                            <FormField type="number" name="helpDelay" label="Tempo de espera" value={form.initialValues.retryNumber} />
                        </div>
                        <FormField name="retryNumber" label="Total de tentativas" required value={form.initialValues.retryNumber} />
                        <TagsInputSelec name="objectives" label="Alvos" placeholder="Digite um de cada vez e pressione ENTER" value={form.initialValues.objectives} />
                        <TextArea name="description" label="Procedimento" value={form.initialValues.description} required={true} />
                    </form>
                )}
            </Formik>
            <ConfirmDisableDialog isOpen={showDisablePopup} onClose={() => setShowDisablePopup(false)} onConfirm={handleDisableEntity} />
        </Modal >
    );
}

const schema = Yup.object().shape({
    name: Yup.string().required('O campo nome é obrigatório'),
    description: Yup.string().required('O campo descrição é obrigatório'),
    activityApplicationType: Yup.object(),
    helpType: Yup.object(),
    helpDelay: Yup.number(),
    retryNumber: Yup.number(),
    objectives: Yup.array().of(Yup.object().shape({
        name: Yup.string().required('O campo nome é obrigatório')
    })).min(1, 'Informe ao menos 1 alvo')
})

export default ActivityForm;

const Header = styled.h3`
    margin-bottom: 0px;
`;

const CreatedAtLabel = styled.span`
    font-size: 11px;
    color: #42526E;
`;

const DeleteButton = styled(Button)`
    position: absolute !important;
    right: 24px;
    top: 48px;
`;