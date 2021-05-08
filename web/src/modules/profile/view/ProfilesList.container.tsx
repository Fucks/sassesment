import Avatar, { AvatarItem } from "@atlaskit/avatar";
import { FunctionComponent, useEffect, useState } from "react";
import { useHistory } from "react-router";
import ListContainerLayout, { Content, Items, ItemsContent, ListItem } from "../../../components/layout/ListContainerLayout";
import ListLoading from "../../../components/loading/ListLoading";
import { Page, Pageable } from "../../../services/util/page";
import Pagination from '@atlaskit/pagination';
import { getPagesArray, onChangePage } from "../../../services/util/helpers";
import { ProfileService } from "../../../services/profile/profile.service";

export interface ProfilesListContainerProps {
}

const ProfilesListContainer: FunctionComponent<ProfilesListContainerProps> = () => {

    const service = new ProfileService();
    const history = useHistory();

    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [contentPage, setContentPage] = useState<Pageable<any>>();
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
        history.push('/profile/form');
    }

    const onRowClick = (profile: any) => {
        history.push(`/profile/form/${profile.id}`)
    }

    return (
        <ListContainerLayout
            title="Listagem de perfis de acesso"
            breadcrumbs={["Perfil de acesso", "Listagem"]}
            onSearchAction={setFilter}
            onNewAction={goToNew}>

            <Content>
                <ItemsContent>
                    <Items>
                        {loading ? <ListLoading />
                            : contentPage?.content.map(e => (<ListItem key={e.id} onClick={() => onRowClick(e)}><AvatarItem primaryText={e.name} avatar={<Avatar />} /></ListItem>))
                        }
                    </Items>
                </ItemsContent>
                {
                    contentPage && contentPage.totalPages > 0 &&
                    <Pagination selectedIndex={page.page} onChange={(ev, page) => onChangePage(ev, page, setPage)} innerStyles={{ margin: '0 auto' }} pages={getPagesArray(contentPage)} />
                }
            </Content>
        </ListContainerLayout>
    );
}

export default ProfilesListContainer;