import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Patient } from "../../../../../services/patient/patient.service";
import { useAuthentication } from "../../../../../context/AutenticationContext";
import { AuthenticationInfo } from "../../../../../services/Authentication.service";
import { usePatientContext } from "../../../context/PatientContext";
import { ActivityHistory, Assessment, PatientAssessmentService } from "../../../../../services/patient/patient-assessment.service";
import AssessmentPlanRow, { NewActivityHistoryRow } from "./components/AssessmentPlanRow.component";
import AssesmentActivityExecutionForm from "./AssessmentActivityExecutionForm";
import EmptyState from "../../../../../components/empty-state/EmptyState";
import ErrorIcon from '@atlaskit/icon/glyph/error';
import Modal from '@atlaskit/modal-dialog'
import Banner from "@atlaskit/banner";
import styled from "styled-components";
import { dateAndTimeToString } from "../../../../../services/util/date-helper";
import Lozenge from '@atlaskit/lozenge';
import async from "react-select/async";

export interface AssessmentFormProps {
    assessment?: Assessment,
    onClose: (assessment: Assessment | null) => void
}

const AssessmentForm: FunctionComponent<AssessmentFormProps> = ({ assessment, onClose }) => {

    const service = useMemo(() => new PatientAssessmentService(), [])

    const { state } = usePatientContext();

    const { state: auth } = useAuthentication();
    // const loggedUser = auth as AuthenticationInfo;
    // const loggedProfessional = {
    //     id: loggedUser.id,
    //     name: loggedUser.name,
    //     email: loggedUser.email
    // };

    const [showActivityExecutionForm, setShowActivityExecutionForm] = useState<boolean>(false);
    const [model, setModel] = useState<Assessment | undefined>();
    const [error, setError] = useState<any>();

    const [submitting, setSubmitting] = useState(false);
    const [finishing, setFinishing] = useState(false);

    const title = assessment?.id ? `Atendimento #${assessment.id}` : 'Novo atendimento';

    useEffect(() => {

        let _assesment = assessment;

        if (!_assesment) {
            _assesment = {
                startDate: new Date(),
                patient: state?.patient as Patient,
                assessmentPlan: []
            }
        }

        setModel(_assesment);
    }, []);

    const onCloseTraineeModal = (history: ActivityHistory | null) => {

        if (history) {
            model?.assessmentPlan.push(history);
        }

        setModel(model);
        setShowActivityExecutionForm(false);
    }

    const onSave = async () => {

        setSubmitting(true);

        try {
            const _model = { ...model, ...{ patient: state?.patient } } as Assessment;
            const entity = model?.id ? await service.update(_model) : await service.create(_model);

            onClose(entity);
        }
        catch (err) {
            setError(err)
        }
        finally {
            setSubmitting(false);
        }

    }

    const onFinishAssessment = async () => {

        setFinishing(true);

        try {
            const entity = await service.finish({ ...model, ...{ patient: state?.patient } } as Assessment);
            onClose(entity);
        }
        catch (err) {
            setError(err)
        }
        finally {
            setFinishing(false);
        }
    }

    return (
        <Modal
            actions={[
                { text: 'Finalizar atendimento', isLoading: finishing, isDisabled: submitting, hidden: assessment?.endDate != null, appearance: 'default', onClick: onFinishAssessment },
                { text: 'Salvar', appearance: "primary", isDisabled: finishing, hidden: assessment?.endDate != null, onClick: onSave, isLoading: submitting },
                { text: assessment?.endDate != null ? 'Fechar' : 'Cancelar', onClick: () => onClose(null) },
            ]}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEscapePress={false}
            onClose={() => onClose(null)}
            scrollBehavior={"inside"}
            height="800px"
            heading={
                <div className="col-12 text-truncate">
                    <Header>{title} {!assessment?.endDate && <Lozenge appearance="removed">Não finalizado</Lozenge>}</Header>
                    <Subtitle>Iniciado em: {dateAndTimeToString(assessment?.startDate as Date)} por {assessment?.professional?.name}</Subtitle>
                </div>
            }>
            {error &&
                <Banner
                    appearance="error"
                    icon={<ErrorIcon label="" secondaryColor="inherit" />}
                    isOpen>
                    {(error as any).message}
                </Banner>
            }
            {assessment?.assessmentPlan && assessment?.assessmentPlan.length > 0 &&
                <>
                    {assessment?.assessmentPlan.map(e => <AssessmentPlanRow key={e.startDate.toISOString()} activityHistory={e} />)}
                    {!assessment?.endDate && <NewActivityHistoryRow onClick={() => setShowActivityExecutionForm(true)} />}
                </>
            }
            {assessment?.assessmentPlan.length == 0 &&
                <EmptyState
                    header="Nenhum treino aplicado até o momento"
                    description="Até o momento nenhum treino foi aplicado. Para aplicar um treino clique no botão abaixo."
                    newActionLabel="Aplicar treino"
                    onNewAction={() => setShowActivityExecutionForm(true)} />
            }
            {showActivityExecutionForm && <AssesmentActivityExecutionForm assessment={assessment as Assessment} onClose={onCloseTraineeModal} />}
        </Modal>
    );
}

export default AssessmentForm;

const Header = styled.h3`
    margin-bottom: 0px;
`;

const Subtitle = styled.span`
    font-size: 12px;
    color: #5E6C84;
    font-weight: 200;
`