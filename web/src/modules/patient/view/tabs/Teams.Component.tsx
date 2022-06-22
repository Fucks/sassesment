import { AvatarItem } from "@atlaskit/avatar";
import { FunctionComponent, useState } from "react";
import { ItemsContent, ListItem } from "../../../../components/layout/ListContainerLayout";
import { Patient } from "../../../../services/patient/patient.service";
import { Team } from "../../../../services/team/team.service";
import { Actions, PatientContextData, usePatientContext } from "../../context/PatientContext";
import styled from "styled-components";
import Initials from "../../../../components/initials/Initials";
import EmptyState from "../../../../components/empty-state/EmptyState";
import Button from "@atlaskit/button";
import TeamsForm from "../components/TeamsForm";
import ListLoading from "../../../../components/loading/ListLoading";

export interface ActivitiesTabComponentProps {
    patient: Patient,
    loading?: boolean;
}

const PatientTeamsTabComponent: FunctionComponent<ActivitiesTabComponentProps> = ({ patient, loading }) => {

    const [showForm, setShowForm] = useState<boolean>(false);

    const { state: context, dispatch } = usePatientContext();
    const state = context as PatientContextData;

    const onFormClose = (team?: Team | null) => {

        if (team && state.teams.findIndex(e => e.id == team.id) < 0) {
            dispatch({ type: Actions.LOAD, payload: { teams: [...state.teams, team] } })
        }

        setShowForm(false);

    }

    const handleAddTeam = async () => {
        setShowForm(true);
    }

    return loading ? <ListLoading /> :
        <div>
            {
                state.teams.length > 0 &&
                <div className="pt-2">
                    <Button onClick={() => handleAddTeam()}>Adicionar a uma equipe</Button>
                    <ItemsContent className="flex-lg-wrap flex-lg-row flex-column pt-2">
                        {state.teams.map((e, i) => (
                            <div className="col-lg-6 col-md-12 col-sm-12">

                                <ListItem key={i}>
                                    <AvatarItem primaryText={e.name} avatar={<Initials text={e.name} />} />
                                </ListItem>
                            </div>
                        ))}
                    </ItemsContent>
                </div>
            }
            {
                state.teams.length == 0 &&
                <EmptyState onNewAction={handleAddTeam} />
            }
            {
                showForm && <TeamsForm id={patient.id as number} onClose={onFormClose} />
            }
        </div>;
}

export default PatientTeamsTabComponent;

const Container = styled.div`
    padding: 16px 64px;
    display: flex;
    flex: 1;
    flex-direction: column;
`;