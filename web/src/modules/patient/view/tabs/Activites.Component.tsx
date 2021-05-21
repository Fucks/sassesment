import Avatar, { AvatarItem } from "@atlaskit/avatar";
import { FunctionComponent, useEffect, useState } from "react";
import { Items, ItemsContent, ListItem } from "../../../../components/layout/ListContainerLayout";
import ListLoading from "../../../../components/loading/ListLoading";
import { Activity, PatientActivityService } from "../../../../services/patient/patient-activity.service";
import { Patient } from "../../../../services/patient/patient.service";
import { getPagesArray, onChangePage } from "../../../../services/util/helpers";
import { Page, Pageable } from "../../../../services/util/page";
import Pagination from '@atlaskit/pagination';
import EmptyState from "../../../../components/empty-state/EmptyState";
import ActivityForm from "../components/ActivityForm";
import styled from "styled-components";
import Initials from "../../../../components/initials/Initials";
import Button from "@atlaskit/button";

export interface ActivitiesTabComponentProps {
    patient: Patient
}

const ActivitiesTabComponent: FunctionComponent<ActivitiesTabComponentProps> = ({ patient }) => {

    const service = new PatientActivityService();

    const [page, setPage] = useState<Page>({ page: 0, size: 10 });
    const [contentPage, setContentPage] = useState<Pageable<Activity>>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [showForm, setShowForm] = useState(false);
    const [activitySelected, setSelectedActivity] = useState<Activity>();

    useEffect(() => {
        fetchActivities();
    }, [])

    const fetchActivities = async () => {

        setLoading(true);

        try {
            var response = await service.listPatientActivities(patient?.id as number, page);
            setContentPage(response);
        }
        catch (err) {
            throw err
        }
        finally {
            setLoading(false)
        }
    }

    const handleShowForm = (activity?: Activity) => {
        setSelectedActivity(activity);
        setShowForm(true);
    }

    const onFormClose = () => {
        setShowForm(false)
        fetchActivities();
    }

    return (
        <Container>
            {
                contentPage && contentPage.totalElements > 0 &&
                <ItemsContent style={{ flex: 1 }}>
                    <Button onClick={() => handleShowForm()}>Criar nova atividade</Button>
                    <Items>
                        {loading ? <ListLoading />
                            : contentPage?.content.map(e => (<ListItem onClick={() => handleShowForm(e)}><AvatarItem primaryText={e.name} avatar={<Initials text={e.name} />} /></ListItem>))
                        }
                    </Items>
                </ItemsContent>
            }
            {
                contentPage && contentPage.totalPages > 0 &&
                <Pagination selectedIndex={page.page} onChange={(ev, page) => onChangePage(ev, page, setPage)} innerStyles={{ margin: '0 auto' }} pages={getPagesArray(contentPage)} />
            }
            {
                contentPage && contentPage.totalElements == 0 &&
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