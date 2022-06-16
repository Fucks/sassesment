import { AvatarItem } from "@atlaskit/avatar";
import { FunctionComponent, useState } from "react";
import { Items, ItemsContent, ListItem } from "../../../../components/layout/ListContainerLayout";
import { Patient } from "../../../../services/patient/patient.service";
import { Actions, usePatientContext } from "../../context/PatientContext";
import { AuthenticationInfo } from "../../../../services/Authentication.service";
import { useAuthentication } from "../../../../context/AutenticationContext";
import { dateAndTimeToString } from "../../../../services/util/date-helper";
import { Assessment } from "../../../../services/patient/patient-assessment.service";
import EmptyState from "../../../../components/empty-state/EmptyState";
import styled from "styled-components";
import Initials from "../../../../components/initials/Initials";
import Button from "@atlaskit/button";
import AttendaceForm from "../components/AssessmentForm/AssessmentForm";
import Lozenge from "@atlaskit/lozenge";

export interface AssessmentsTabComponentProps {
    patient: Patient
}

const AssessmentsTabComponent: FunctionComponent<AssessmentsTabComponentProps> = ({ patient }) => {

    const { state, dispatch } = usePatientContext();

    const { state: auth } = useAuthentication();
    const userLogged = auth as AuthenticationInfo;

    const [error, setError] = useState();
    const [showForm, setShowForm] = useState(false);
    const [assessment, setAssessment] = useState<Assessment | undefined>();

    const handleShowForm = (_assessment?: Assessment) => {

        if (!_assessment) {
            _assessment = {
                patient: patient,
                professional: {
                    id: userLogged.id,
                    name: userLogged.name,
                    email: userLogged.email,
                },
                startDate: new Date(),
                assessmentPlan: []
            }
        }

        setAssessment(_assessment)
        setShowForm(true);
    }

    const onFormClose = (assessment: Assessment | null) => {

        if (assessment) {
            dispatch({ type: Actions.UPDATE_ASSESSMENTS, payload: assessment as Assessment })
        }

        setShowForm(false)
    }

    return (
        <Container>
            {
                state?.assessments && state.assessments.length > 0 &&
                <ItemsContent style={{ flex: 1 }}>
                    <Button onClick={() => handleShowForm()}>Iniciar novo atendimento</Button>
                    <Items>
                        {state?.assessments.map(e => (
                            <ListItem onClick={() => handleShowForm(e)}>
                                <AvatarItem
                                    primaryText={<>{`Atendimento #${e.id}`}  {!e?.endDate && <Lozenge appearance="removed">Não finalizado</Lozenge>}</>}
                                    secondaryText={`${dateAndTimeToString(e.startDate)}`}
                                    avatar={<Initials text={`Atendimento ${e.id}`} />} />
                            </ListItem>)
                        )}
                    </Items>
                </ItemsContent>
            }
            {
                (!state?.assessments || state.assessments.length == 0) &&
                <EmptyState onNewAction={() => handleShowForm()} />
            }
            {
                showForm && <AttendaceForm assessment={assessment} onClose={onFormClose} />
            }
        </Container>);
}

export default AssessmentsTabComponent;

const Container = styled.div`
    padding: 16px 64px;
    display: flex;
    flex: 1;
    flex-direction: column;
`;