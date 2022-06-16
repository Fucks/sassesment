import { AvatarItem } from "@atlaskit/avatar";
import { FunctionComponent, useState } from "react";
import { Items, ItemsContent, ListItem } from "../../../../components/layout/ListContainerLayout";
import { Activity } from "../../../../services/patient/patient-activity.service";
import { Patient } from "../../../../services/patient/patient.service";
import EmptyState from "../../../../components/empty-state/EmptyState";
import ActivityForm from "../components/ActivityForm";
import styled from "styled-components";
import Initials from "../../../../components/initials/Initials";
import Button from "@atlaskit/button";
import { Actions, PatientContextData, usePatientContext } from "../../context/PatientContext";

export interface ActivitiesTabComponentProps {
    patient: Patient
}

const ActivitiesTabComponent: FunctionComponent<ActivitiesTabComponentProps> = ({ patient }) => {

    const {state: context, dispatch} = usePatientContext();
    const state = context as PatientContextData;

    const [showForm, setShowForm] = useState(false);
    const [activitySelected, setSelectedActivity] = useState<Activity>();

    const handleShowForm = (activity?: Activity) => {
        setSelectedActivity(activity);
        setShowForm(true);
    }

    const onFormClose = (activity: Activity | null) => {
        setShowForm(false);

        if(activity) {
            dispatch({type: Actions.UPDATE_ACTIVITY, payload: activity})
        }
    }

    return (
        <Container>
            {
                state.activities.length > 0 &&
                <ItemsContent style={{ flex: 1 }}>
                    <Button onClick={() => handleShowForm()}>Criar nova atividade</Button>
                    <Items>
                        {state.activities.map(e => (<ListItem onClick={() => handleShowForm(e)}><AvatarItem primaryText={e.name} secondaryText={`${e.activityApplicationType.name} (${e.helpType.name})`} avatar={<Initials text={e.name} />} /></ListItem>))}
                    </Items>
                </ItemsContent>
            }
            {
                state.activities.length == 0 &&
                <EmptyState onNewAction={() => handleShowForm()} />
            }
            {
                showForm && <ActivityForm activity={activitySelected} patient={patient} onClose={onFormClose} />
            }
        </Container>);
}

export default ActivitiesTabComponent;

const Container = styled.div`
    padding: 16px 64px;
    display: flex;
    flex: 1;
    flex-direction: column;
`;