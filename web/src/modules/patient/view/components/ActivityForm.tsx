import { Formik } from "formik";
import { FunctionComponent, useState } from "react";
import * as Yup from 'yup';
import { Activity, PatientActivityService } from "../../../../services/patient/patient-activity.service";
import Modal from '@atlaskit/modal-dialog'
import FormField from "../../../../components/form-field/FormField";
import AsyncSelect from "../../../../components/select/AsyncSelect";
import { Patient } from "../../../../services/patient/patient.service";
import TextArea from "../../../../components/form-field/TextArea";
import Select from "../../../../components/select/Select";
import Banner from "@atlaskit/banner";
import ErrorIcon from '@atlaskit/icon/glyph/error';

export interface ActivityFormProps {
    activity?: Activity,
    patient: Patient,
    onClose: (activity: Activity | null) => void
}

const ActivityForm: FunctionComponent<ActivityFormProps> = ({ activity, patient, onClose }) => {

    const service = new PatientActivityService();

    const title = activity != null ? 'Editar atividade' : 'Criar nova atividade';

    const [error, setError] = useState();

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

    const form = {
        initialValues: activity || {
            name: '', activityApplicationType: { name: '' }, helpType: { name: '' }, retryNumber: 1, objectives: []
        },
        validationSchema: schema,
        enableReinitialize: true,
        onSubmit: handleSubmit
    }

    return (
        <Modal
            actions={[
                { text: 'Salvar', type: 'submit', form: "activity" },
                { text: 'Cancelar', onClick: () => onClose(null) },
            ]}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEscapePress={false}
            onClose={() => onClose(null)}
            height="1200px"
            heading={title} >
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
                        <AsyncSelect fetch={handleHelpType} label="Tipo de ajuda" name="helpType" />
                        <FormField name="retryNumber" label="Total de tentativas" required value={form.initialValues.retryNumber} />
                        <Select name="objectives" label="Alvos" value={form.initialValues.objectives} />
                        <TextArea name="description" label="Procedimento" value={form.initialValues.description} />
                    </form>
                )}
            </Formik>
        </Modal >
    );
}

const schema = Yup.object().shape({
    name: Yup.string().required('O campo nome é obrigatório'),
    description: Yup.string().required('O campo descrição é obrigatório'),
    activityApplicationType: Yup.object(),
    helpType: Yup.object(),
    retryNumber: Yup.number(),
    objectives: Yup.array().of(Yup.object().shape({
        name: Yup.string().required('O campo nome é obrigatório')
    }))
})

export default ActivityForm;