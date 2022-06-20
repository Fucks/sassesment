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
        <div>
            {
                state?.assessments && state.assessments.length > 0 &&
                <div className="pt-2">
                    <Button onClick={() => handleShowForm()}>Iniciar novo atendimento</Button>
                    <ItemsContent className="flex-lg-wrap flex-lg-row flex-column pt-2">
                        {state?.assessments.map(e => (
                            <div className="col-lg-6 col-md-12 col-sm-12">

                                <ListItem onClick={() => handleShowForm(e)}>
                                    <AvatarItem
                                        primaryText={<>{`Atendimento #${e.id}`}  {!e?.endDate && <Lozenge appearance="removed">Não finalizado</Lozenge>}</>}
                                        secondaryText={`${dateAndTimeToString(e.startDate)}`}
                                        avatar={<Initials text={`Atendimento ${e.id}`} />} />
                                </ListItem>
                            </div>)
                        )}
                    </ItemsContent>
                </div>
            }
            {
                (!state?.assessments || state.assessments.length == 0) &&
                <EmptyState onNewAction={() => handleShowForm()} />
            }
            {
                showForm && <AttendaceForm assessment={assessment} onClose={onFormClose} />
            }
        </div>);
}

export default AssessmentsTabComponent;