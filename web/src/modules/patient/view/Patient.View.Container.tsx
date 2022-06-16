import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Patient, PatientService } from "../../../services/patient/patient.service";
import { usePatientContext, Actions as PatientContextActions } from "../context/PatientContext";
import { PatientActivityService } from "../../../services/patient/patient-activity.service";
import { PatientAssessmentService } from "../../../services/patient/patient-assessment.service";
import FormContainerLayout from "../../../components/layout/FormContainerLayout";
import styled from "styled-components";
import Button from "@atlaskit/button";
import Tabs, { Tab, TabList } from "@atlaskit/tabs";
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import ActivitiesTabComponent from "./tabs/Activites.Component";
import ErrorBoundary from '../../../components/error-boundary/ErrorBoundary'
import NotImplementedYet from "../../../components/not-implemented-yet/NotImplementedYet";
import PatientTeamsTabComponent from "./tabs/Teams.Component";
import AssessmentsTabComponent from "./tabs/Assessments.Component";
import './patient-view.css'

export interface PatientViewContainerProps { }

const PatientViewContainer: FunctionComponent<PatientViewContainerProps> = () => {

    const service = useMemo(() => new PatientService(), []);
    const activitiesService = useMemo(() => new PatientActivityService(), []);
    const assessmentService = useMemo(() => new PatientAssessmentService(), []);

    const { state, dispatch } = usePatientContext();

    const { id } = useParams<any>();

    const history = useHistory();
    const breacrumbs = ["Paciente", "Visualização"];

    const [title, setTitle] = useState('');
    const [error, setError] = useState<unknown>();
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
            const activities = await activitiesService.listPatientActivities(patient?.id as number);
            const teams = await service.fetchTeams(patient.id as number);
            const assessments = await assessmentService.load(patient.id as number, { page: 0, size: 10 });

            setPatient(patient);
            setTitle(patient.name);

            dispatch({
                type: PatientContextActions.LOAD, payload: {
                    patient: patient,
                    activities: activities.content,
                    teams: teams,
                    assessments: assessments.content,
                    assessmentPage: { page: 0, size: 10 }
                }
            })

        }
        catch (err: unknown) {
            setError(err)
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
                    {!error && 
                        <Content>
                            {
                                selected == 0 &&
                                <NotImplementedYet />
                            }
                            {
                                selected == 1 &&
                                <ActivitiesTabComponent patient={patient as Patient} />
                            }
                            {
                                selected == 2 &&
                                <AssessmentsTabComponent patient={patient as Patient} />
                            }
                            {
                                selected == 3 &&
                                <PatientTeamsTabComponent patient={patient as Patient} />
                            }
                        </Content>
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
    display: flex;
    flex: 1
`;