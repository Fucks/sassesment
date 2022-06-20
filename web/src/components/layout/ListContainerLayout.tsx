import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import { FunctionComponent, useMemo } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { ActionItem, PageHeader, SmallPageHeader } from "../page-header/PageHeader";

export interface ListContainerLayoutProps {
    title: string;
    breadcrumbs?: string[]
    newButtonText?: string;
    onBackAction?: () => void,
    onNewAction?: () => void,
    onSearchAction?: (filter: string) => void
}

const ListContainerLayout: FunctionComponent<ListContainerLayoutProps> = ({ title, breadcrumbs, newButtonText, onNewAction, onSearchAction, children, onBackAction }) => {

    const breadcrumbsContent = useMemo(() => (
        <Breadcrumbs>
            {breadcrumbs?.map(item => <BreadcrumbsItem text={item} key={item} />)}
        </Breadcrumbs>
    ), [])

    const actionsContent: ActionItem[] = useMemo(() => [
        {
            type: "searchbar"
        },
        {
            label: newButtonText || "Novo",
            appearance: "primary",
            onClick: onNewAction
        }
    ], []);

    return (
        <>
            <PageHeader  onBackAction={onBackAction}  className="d-none d-md-block d-lg-block d-xlg-block d-xxlg-block d-xxxlg-block"
                breadcrumbs={breadcrumbsContent}
                actions={actionsContent}>
                {title}
            </PageHeader>
            <SmallPageHeader onBackAction={onBackAction} className="d-flex justify-content-between d-md-none d-lg-none d-xlg-none d-xxlg-none d-xxxlg-none"
                actions={actionsContent}>
                {title}
            </SmallPageHeader>
            <ListContainer className="container-fluid d-flex flex-grow-1">
                {children}
            </ListContainer>
        </>
    );
}

export default ListContainerLayout;

export const ListContainer = styled.div`
    padding: 0 64px;
    margin: 0 0 64px 0;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 32px 0 0 0;
    flex: 1;
`;

export const ItemsContent = styled.div`
    display: flex;
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
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    cursor: pointer;
    height: 60px
`;
