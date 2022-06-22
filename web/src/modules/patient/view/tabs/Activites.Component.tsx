import { AvatarItem } from "@atlaskit/avatar";
import { FunctionComponent, useState } from "react";
import { ItemsContent, ListItem } from "../../../../components/layout/ListContainerLayout";
import { Activity } from "../../../../services/patient/patient-activity.service";
import { Patient } from "../../../../services/patient/patient.service";
import EmptyState from "../../../../components/empty-state/EmptyState";
import ActivityForm from "../components/ActivityForm";
import Initials from "../../../../components/initials/Initials";
import Button from "@atlaskit/button";
import { Actions, PatientContextData, usePatientContext } from "../../context/PatientContext";
import ListLoading from "../../../../components/loading/ListLoading";

export interface ActivitiesTabComponentProps {
    loading?: boolean;
    patient: Patient
}

const ActivitiesTabComponent: FunctionComponent<ActivitiesTabComponentProps> = ({ patient, loading }) => {

    const { state: context, dispatch } = usePatientContext();
    const state = context as PatientContextData;

    const [showForm, setShowForm] = useState(false);
    const [activitySelected, setSelectedActivity] = useState<Activity>();

    const handleShowForm = (activity?: Activity) => {
        setSelectedActivity(activity);
        setShowForm(true);
    }

    const onFormClose = (activity: Activity | null) => {
        setShowForm(false);

        if (activity) {
            dispatch({ type: Actions.UPDATE_ACTIVITY, payload: activity })
        }
    }

    if (loading) {
        return <ListLoading />
    }

    return (
        <div>
            {
                state.activities.length > 0 &&
                <div className="pt-2">
                    <Button onClick={() => handleShowForm()}>Criar nova atividade</Button>
                    <ItemsContent className="flex-lg-wrap flex-lg-row flex-column pt-2">
                        {state.activities.map(e => (
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <ListItem onClick={() => handleShowForm(e)}>
                                    <AvatarItem primaryText={e.name} secondaryText={`${e.activityApplicationType.name} (${e.helpType.name})`} avatar={<Initials text={e.name} />} />
                                </ListItem>
                            </div>
                        ))}
                    </ItemsContent>
                </div>

            }
            {
                state.activities.length == 0 &&
                <EmptyState onNewAction={() => handleShowForm()} />
            }
            {
                showForm && <ActivityForm activity={activitySelected} patient={patient} onClose={onFormClose} />
            }
        </div>
    );
}

export default ActivitiesTabComponent;