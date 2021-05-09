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
    const [error, setError] = useState(null);

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
            title="Listagem de profissionais"
            breadcrumbs={["Profissionais", "Listagem"]}
            onSearchAction={setFilter}
            onNewAction={goToNew}>

            <Content>
                {
                    contentPage && contentPage.totalElements > 0 &&
                    <ItemsContent>
                        <Items>
                            {loading ? <ListLoading />
                                : contentPage?.content.map(e => (<ListItem key={e.id} onClick={() => onRowClick(e)}><AvatarItem primaryText={e.name} secondaryText={e.occupation?.name || 'Nenhuma ocupação'} avatar={<Avatar />} /></ListItem>))
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
                    <EmptyState onNewAction={goToNew} />
                }
            </Content>
        </ListContainerLayout>
    );
}

export default ProfessionalListContainer;