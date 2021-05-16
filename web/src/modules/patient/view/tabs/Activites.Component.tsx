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

    const goToForm = (activity?: Activity) => {
        setSelectedActivity(activity);
        setShowForm(true);
    }

    return (
        <>
            {
                contentPage && contentPage.totalElements > 0 &&
                <ItemsContent>
                    <Items>
                        {loading ? <ListLoading />
                            : contentPage?.content.map(e => (<ListItem onClick={() => goToForm(e)}><AvatarItem primaryText={e.name} avatar={<Avatar />} /></ListItem>))
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
                <EmptyState onNewAction={() => goToForm()} />
            }
            {
                showForm && <ActivityForm activity={activitySelected} patient={patient} onClose={() => setShowForm(false)} />
            }
        </>);
}

export default ActivitiesTabComponent;