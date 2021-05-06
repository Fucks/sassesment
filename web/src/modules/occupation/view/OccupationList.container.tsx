import Avatar, { AvatarItem } from "@atlaskit/avatar";
import { FunctionComponent } from "react";
import styled from "styled-components";
import ListContainerLayout from "../../../components/layout/ListContainerLayout";
import Pagination from '@atlaskit/pagination';
import { useHistory } from "react-router";

export interface OccupationListContainerProps {
}

const OccupationListContainer: FunctionComponent<OccupationListContainerProps> = () => {

    const ocuppations = [{
        id: 1,
        name: 'Gestor'
    },
    {
        id: 2,
        name: 'Gestor'
    },
    {
        id: 3,
        name: 'Gestor'
    },
    {
        id: 4,
        name: 'Gestor'
    },
    {
        id: 5,
        name: 'Gestor'
    },
    {
        id: 6,
        name: 'Gestor'
    },
    {
        id: 7,
        name: 'Gestor'
    },
    {
        id: 8,
        name: 'Gestor'
    },
    {
        id: 9,
        name: 'Gestor'
    },
    {
        id: 10,
        name: 'Gestor'
    },
    {
        id: 11,
        name: 'Gestor'
    },
    {
        id: 12,
        name: 'Gestor'
    },
    {
        id: 13,
        name: 'Gestor'
    },
    {
        id: 13,
        name: 'Gestor'
    },
    {
        id: 13,
        name: 'Gestor'
    },
    {
        id: 13,
        name: 'Gestor'
    },
    {
        id: 13,
        name: 'Gestor'
    },
    {
        id: 13,
        name: 'Gestor'
    },
    {
        id: 13,
        name: 'Gestor'
    },
    {
        id: 13,
        name: 'Gestor'
    },
    {
        id: 13,
        name: 'Gestor'
    },
    {
        id: 13,
        name: 'Gestor'
    },

    ];

    const history = useHistory();

    const onRowClick = (row: any) => {
        history.push(`/occupation/form/${row.id}`)
    }

    const goToNew = () => history.push('/occupation/form')

    return (
        <ListContainerLayout
            title="Listagem de ocupações"
            breadcrumbs={["Ocupações", "Listagem"]}
            onNewAction={goToNew}>

            <Content>
                <Items>
                    {ocuppations.map(e => (<ListItem onClick={() => onRowClick(e)}><AvatarItem primaryText={e.name} avatar={<Avatar />} /></ListItem>))}
                </Items>
                <Pagination innerStyles={{ margin: '0 auto' }} pages={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
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

const Items = styled.div`
    flex: 1;
    overflow: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
    
    & > div:nth-child(1) {
        margin-top: 32px
    }

    & > div:nth-child(2) {
        margin-top: 32px
    }

    & > div:nth-last-child(1) {
        margin-bottom: 32px
    }

    & > div:nth-last-child(2) {
        margin-bottom: 32px
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
`;