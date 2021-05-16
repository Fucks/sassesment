import { FunctionComponent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import FormContainerLayout from "../../../components/layout/FormContainerLayout";
import { Patient, PatientService } from "../../../services/patient/patient.service";
import styled from "styled-components";
import Button from "@atlaskit/button";
import Tabs, { Tab, TabList } from "@atlaskit/tabs";
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import './patient-view.css'
import ActivitiesTabComponent from "./tabs/Activites.Component";
import ErrorBoundary from '../../../components/error-boundary/ErrorBoundary'

export interface PatientViewContainerProps { }

const PatientViewContainer: FunctionComponent<PatientViewContainerProps> = () => {

    const { id } = useParams<any>();
    const history = useHistory();
    const service = new PatientService();
    const breacrumbs = ["Paciente", "Visualização"];

    const [title, setTitle] = useState('');
    const [error, setError] = useState();
    const [loading, setLoading] = useState<boolean>(true);
    const [patient, setPatient] = useState<Patient>();
    const [selected, setSelected] = useState(1);

    useEffect(() => {
        fetchPatient();
    }, [])

    const fetchPatient = async () => {

        setLoading(true);

        try {
            const patient = await service.getById(id);
            setPatient(patient);
            setTitle(patient.name)
        }
        catch (err) {
            setError(error)
        }
        finally {
            setLoading(false);
        }

    }

    const actions = (
        <Actions>
            <Button type="button" onClick={() => history.push(`/patient/form/${id}`)} appearance="primary">Editar</Button>
        </Actions>
    )

    const tagsMenu = (
        <TabList>
            <Tab><DashboardIcon label="" /></Tab>
            <Tab>Atividades</Tab>
            <Tab>Histórico de atendimentos</Tab>
            <Tab>Equipes</Tab>
        </TabList>
    )

    return (

        <Tabs
            onChange={index => setSelected(index)}
            selected={selected}
            id="default">
            <FormContainerLayout
                title={title}
                onBackAction={() => history.goBack()}
                saveButton={actions}
                bottomBar={tagsMenu}
                breadcrumbs={breacrumbs}>
                {!loading && <ErrorBoundary>
                    {
                        selected == 1 &&
                        <ActivitiesTabComponent patient={patient as Patient} />
                    }
                </ErrorBoundary>
                }
            </FormContainerLayout>
        </Tabs>
    );
}

export default PatientViewContainer;

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
`;

const Content = styled.div`
    padding: 0 64px;
    flex-direction: column;
    width: 40%;
`;