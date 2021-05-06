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

            console.log(values);

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
        <form {...form} onSubmit={form.handleSubmit} >
            <Textfield name="filter" style={{background: '#fff'}} autoComplete="off" onChange={form.handleChange} placeholder="Pesquisar" />
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
            <Content>
                {children}
            </Content>
        </>
    );
}

export default ListContainerLayout;

const Content = styled.div`
    padding: 0 0 16px 32px;
    overflow-y: hidden;
    display: flex;
    flex: 1;
`;