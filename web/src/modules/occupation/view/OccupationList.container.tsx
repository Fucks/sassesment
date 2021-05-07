import Avatar, { AvatarItem, Skeleton } from "@atlaskit/avatar";
import { FunctionComponent, SyntheticEvent, useEffect, useState } from "react";
import styled from "styled-components";
import ListContainerLayout from "../../../components/layout/ListContainerLayout";
import Pagination from '@atlaskit/pagination';
import { useHistory } from "react-router";
import { Occupation, OccupationService } from "../../../services/occupation/occupation.service";
import { Page, Pageable } from "../../../services/util/page";
import { SkeletonItem } from "@atlaskit/side-navigation";

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
            console.log(page);
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

    const onChangePage = (event: SyntheticEvent<any>, _page: any) => {
        setPage({ page: _page - 1, size: 10 });
    }

    const onRowClick = (row: any) => {
        history.push(`/occupation/form/${row.id}`)
    }

    const goToNew = () => history.push('/occupation/form');

    const getPagesArray = () => {

        if (!contentPage) {
            return [];
        }

        let pages = [];

        for (let i = 0; i < contentPage?.totalPages; i++) {
            pages.push(i + 1);
        }

        return pages;
    }

    return (
        <ListContainerLayout
            title="Listagem de ocupações"
            breadcrumbs={["Ocupações", "Listagem"]}
            onSearchAction={setFilter}
            onNewAction={goToNew}>

            <Content>
                <ItemsContent>
                    <Items>
                        {loading ?
                            [1, 1, 1, 1, 1, 1, 1, 1, 1].map(e => (<ListItem onClick={() => onRowClick(e)}><AvatarItem primaryText={<SkeletonItem />} avatar={<Skeleton />} /></ListItem>)) :
                            contentPage?.content.map(e => (<ListItem onClick={() => onRowClick(e)}><AvatarItem primaryText={e.name} avatar={<Avatar />} /></ListItem>))
                        }
                    </Items>
                </ItemsContent>
                {
                    contentPage && contentPage.totalPages > 0 &&
                    <Pagination selectedIndex={page.page} onChange={onChangePage} innerStyles={{ margin: '0 auto' }} pages={getPagesArray()} />
                }
            </Content>
        </ListContainerLayout>
    );
}

export default OccupationListContainer;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const ItemsContent = styled.div`
    flex: 1;
    overflow: auto;
`;

const Items = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));

    & > div:nth-child(1) {
        margin-top: 32px
    }

    & > div:nth-child(2) {
        margin-top: 32px
    }
`;

const ListItem = styled.div`
    margin: 4px;
    flex: 0.5;
    align-items: center;
    background-color: transparent;
    border-radius: 3px;
    border: 2px solid transparent;
    box-sizing: border-box;
    color: inherit;
    display: flex;
    font-size: inherit;
    font-style: normal;
    font-weight: normal;
    line-height: 1;
    outline: none;
    padding: 4px;
    text-align: left;
    text-decoration: none;
    width: 35%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    width: 90%;
    cursor: pointer;
    height: 60px
`;