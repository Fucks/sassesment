import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import Button, { ButtonGroup } from "@atlaskit/button";
import { FunctionComponent, useMemo } from "react";
import styled from "styled-components";
import Textfield from '@atlaskit/textfield';
import { useFormik } from "formik";
import PageHeader from "../page-header/PageHeader";

export interface ListContainerLayoutProps {
    title: string;
    breadcrumbs?: string[]
    newButtonText?: string;
    onNewAction?: () => void,
    onSearchAction?: (filter: string) => void
}

const ListContainerLayout: FunctionComponent<ListContainerLayoutProps> = ({ title, breadcrumbs, newButtonText, onNewAction, onSearchAction, children }) => {

    const form = useFormik({
        initialValues: {
            filter: ''
        },
        onSubmit: (values) => {

            if (onSearchAction) {
                return onSearchAction(values.filter);
            }

        }
    });

    const breadcrumbsContent = useMemo(() => (
        <Breadcrumbs>
            {breadcrumbs?.map(item => <BreadcrumbsItem text={item} key={item} />)}
        </Breadcrumbs>
    ), [])

    const searchBar = useMemo(() => (
        <form onSubmit={form.handleSubmit} >
            <Textfield name="filter" style={{ background: '#fff' }} autoComplete="off" onChange={form.handleChange} placeholder="Pesquisar" />
            <input type="submit" style={{ display: 'none' }} />
        </form>
    ), []);

    const actionsContent = useMemo(() => (
        <ButtonGroup>
            {searchBar}
            <Button appearance="primary" onClick={onNewAction}>{newButtonText || 'Novo'}</Button>
        </ButtonGroup>
    ), []);

    return (
        <>
            <PageHeader
                breadcrumbs={breadcrumbsContent}
                actions={actionsContent}>
                {title}
            </PageHeader>
            <ListContainer>
                {children}
            </ListContainer>
        </>
    );
}

export default ListContainerLayout;

export const ListContainer = styled.div`
    padding: 0 0 16px 32px;
    overflow-y: hidden;
    display: flex;
    flex: 1;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const ItemsContent = styled.div`
    flex: 1;
    overflow: auto;
`;

export const Items = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));

    & > div:nth-child(1) {
        margin-top: 32px
    }

    & > div:nth-child(2) {
        margin-top: 32px
    }
`;

export const ListItem = styled.div`
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