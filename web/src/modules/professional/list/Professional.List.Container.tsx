import Avatar, { AvatarItem } from "@atlaskit/avatar";
import { FunctionComponent, useEffect, useState } from "react";
import { useHistory } from "react-router";
import ListContainerLayout, { Content, Items, ItemsContent, ListItem } from "../../../components/layout/ListContainerLayout";
import ListLoading from "../../../components/loading/ListLoading";
import { Page, Pageable } from "../../../services/util/page";
import Pagination from '@atlaskit/pagination';
import { getPagesArray, onChangePage } from "../../../services/util/helpers";
import ProfessionalService, { Professional } from "../../../services/professional/professional.service";
import EmptyState from "../../../components/empty-state/EmptyState";

export interface ProfessionalListContainerProps {
}

const ProfessionalListContainer: FunctionComponent<ProfessionalListContainerProps> = () => {

    const service = new ProfessionalService();
    const history = useHistory();

    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [contentPage, setContentPage] = useState<Pageable<Professional>>();
    const [page, setPage] = useState<Page>({ size: 10, page: 0 });
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        loadItens();
    }, [page, filter]);

    const loadItens = async () => {

        setLoading(true);

        try {
            var content = await service.list(filter, page);
            setContentPage(content);
        }
        catch (err) {
            setError(err);
        }
        finally {
            setLoading(false);
        }

    };

    const goToNew = () => {
        history.push('/professional/form');
    }

    const onRowClick = (profile: any) => {
        history.push(`/professional/form/${profile.id}`)
    }

    return (
        <ListContainerLayout
            title="Profissionais"
            breadcrumbs={["Profissionais", "Listagem"]}
            onSearchAction={setFilter}
            onNewAction={goToNew}>

            <Content>
                {loading ? <ListLoading /> :
                    <>
                        {
                            contentPage && contentPage.totalElements > 0 &&
                            <ItemsContent className="flex-lg-wrap flex-lg-row flex-column">
                                {
                                    contentPage?.content.map(e => (
                                        <div className="col-lg-6 col-md-12 col-sm-12">
                                            <ListItem key={e.id} onClick={() => onRowClick(e)}>
                                                <AvatarItem primaryText={e.name} secondaryText={e.occupation?.name || 'Nenhuma ocupação'} avatar={<Avatar />} />
                                            </ListItem>
                                        </div>
                                    ))
                                }
                            </ItemsContent>
                        }
                        {
                            contentPage && contentPage.totalPages > 0 &&
                            <Pagination selectedIndex={page.page} onChange={(ev, page) => onChangePage(ev, page, setPage)} innerStyles={{ margin: '0 auto' }} pages={getPagesArray(contentPage)} />
                        }
                        {
                            contentPage && contentPage.totalElements == 0 &&
                            <EmptyState onNewAction={goToNew} />
                        }
                    </>
                }
            </Content>
        </ListContainerLayout>
    );
}

export default ProfessionalListContainer;