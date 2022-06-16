import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Patient } from "../../../../../services/patient/patient.service";
import { ActivityHistory, Assessment } from "../../../../../services/assessment/assessment.service";
import { useAuthentication } from "../../../../../context/AutenticationContext";
import { AuthenticationInfo } from "../../../../../services/Authentication.service";
import { usePatientContext } from "../../../context/PatientContext";
import { PatientAssessmentService } from "../../../../../services/patient/patient-assessment.service";
import AssessmentPlanRow, { NewActivityHistoryRow } from "./components/AssessmentPlanRow.component";
import AssesmentActivityExecutionForm from "./AssessmentActivityExecutionForm";
import EmptyState from "../../../../../components/empty-state/EmptyState";
import ErrorIcon from '@atlaskit/icon/glyph/error';
import Modal from '@atlaskit/modal-dialog'
import Banner from "@atlaskit/banner";
import styled from "styled-components";
import PerfectScrollbar from 'react-perfect-scrollbar'

export interface AssessmentFormProps {
    assessment?: Assessment,
    onClose: (assessment: Assessment | null) => void
}

const AssessmentForm: FunctionComponent<AssessmentFormProps> = ({ assessment, onClose }) => {

    const service = useMemo(() => new PatientAssessmentService(), [])

    const { state } = usePatientContext();

    const { state: auth } = useAuthentication();
    const loggedUser = auth as AuthenticationInfo;

    const [showActivityExecutionForm, setShowActivityExecutionForm] = useState<boolean>(false);
    const [model, setModel] = useState<Assessment | undefined>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState(false);

    const title = assessment ? `Atendimento #${assessment.id}` : 'Novo atendimento';

    useEffect(() => {

        let _assesment = assessment;

        if (!_assesment) {
            _assesment = {
                professional: {
                    id: loggedUser.id,
                    name: loggedUser.name,
                    email: loggedUser.email
                },
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

        setLoading(true);

        try {
            const entity = await service.create(model as Assessment);
            onClose(entity);
        }
        catch (err) {
            setError(err)
        }
        finally {
            setLoading(false);
        }

    }

    return (
        <Modal
            actions={[
                { text: 'Finalizar atendimento', appearance: 'default', onClick: () => { } },
                { text: 'Salvar', appearance: "primary", onClick: onSave, isLoading: loading },
                { text: 'Cancelar', onClick: () => onClose(null) },
            ]}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEscapePress={false}
            onClose={() => onClose(null)}
            scrollBehavior={"inside"}
            height="800px"
            heading={
                <div>
                    <Header>{title}</Header>
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
                    <NewActivityHistoryRow onClick={() => setShowActivityExecutionForm(true)} />
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