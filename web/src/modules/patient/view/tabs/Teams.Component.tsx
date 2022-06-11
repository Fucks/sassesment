import { AvatarItem } from "@atlaskit/avatar";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Items, ItemsContent, ListItem } from "../../../../components/layout/ListContainerLayout";
import { Patient, PatientService } from "../../../../services/patient/patient.service";
import { Team } from "../../../../services/team/team.service";

import ListLoading from "../../../../components/loading/ListLoading";
import styled from "styled-components";
import Initials from "../../../../components/initials/Initials";
import EmptyState from "../../../../components/empty-state/EmptyState";
import Button from "@atlaskit/button";
import TeamsForm from "../components/TeamsForm";

export interface ActivitiesTabComponentProps {
    patient: Patient
}

const PatientTeamsTabComponent: FunctionComponent<ActivitiesTabComponentProps> = ({ patient }) => {

    const service = useMemo(() => new PatientService(), []);
    const [loading, setLoading] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(false);

    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        if(!teams.length) {
            fetchTeams();
        }
    }, [])

    const fetchTeams = async () => {

        setLoading(true);

        try {
            var response = await service.fetchTeams(patient.id as number);
            setTeams(response);
        }
        catch (err) {
            throw err
        }
        finally {
            setLoading(false)
        }
    }

    const onFormClose = (team? : Team | null) => {

        if(team && teams.findIndex(e => e.id == team.id) < 0) {
            setTeams([...teams, team])
        }

        setShowForm(false);

    }

    const handleAddTeam = async () => {
        setShowForm(true);
    }

    return (
        <Container>
            {
                teams.length > 0 &&
                <ItemsContent style={{ flex: 1 }}>
                    <Button onClick={() => handleAddTeam()}>Adicionar a uma equipe</Button>
                    <Items>
                        {loading ? <ListLoading /> : teams.map(e => (<ListItem><AvatarItem primaryText={e.name} avatar={<Initials text={e.name} />} /></ListItem>))}
                    </Items>
                </ItemsContent>
            }
            {
                teams.length == 0 &&
                <EmptyState  onNewAction={handleAddTeam} />
            }
            {
                showForm && <TeamsForm id={patient.id as number} onClose={onFormClose} />
            }
        </Container>);
}

export default PatientTeamsTabComponent;

const Container = styled.div`
    padding: 16px 64px;
    display: flex;
    flex: 1;
    flex-direction: column;
`;