import { AvatarItem } from "@atlaskit/avatar";
import ListContainerLayout, { Items, ItemsContent, ListItem, Content } from "../../../components/layout/ListContainerLayout";
import { FunctionComponent, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Occupation, OccupationService } from "../../../services/occupation/occupation.service";
import { Page, Pageable } from "../../../services/util/page";
import { getPagesArray, onChangePage } from "../../../services/util/helpers";
import Pagination from '@atlaskit/pagination';
import ListLoading from "../../../components/loading/ListLoading";
import EmptyState from "../../../components/empty-state/EmptyState";
import Initials from "../../../components/initials/Initials";

export interface OccupationListContainerProps {
}

const OccupationListContainer: FunctionComponent<OccupationListContainerProps> = () => {

    const history = useHistory();

    const service = new OccupationService();

    const [contentPage, setContentPage] = useState<Pageable<Occupation>>();
    const [page, setPage] = useState<Page>({ size: 10, page: 0 })

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const [filter, setFilter] = useState<string>('');

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

    const onRowClick = (row: any) => {
        history.push(`/occupation/form/${row.id}`)
    }

    const goToNew = () => history.push('/occupation/form');

    return (
        <ListContainerLayout
            title="Listagem de ocupações"
            breadcrumbs={["Ocupações", "Listagem"]}
            onSearchAction={setFilter}
            onNewAction={goToNew}>

            <Content>
                {
                    contentPage && contentPage.totalElements > 0 &&
                    <ItemsContent>
                        <Items>
                            {loading ? <ListLoading />
                                : contentPage?.content.map(e => (<ListItem onClick={() => onRowClick(e)}><AvatarItem primaryText={e.name} avatar={<Initials text={e.name} />} /></ListItem>))
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

export default OccupationListContainer;
