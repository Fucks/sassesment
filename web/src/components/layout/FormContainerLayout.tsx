import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import Button, { ButtonGroup } from "@atlaskit/button";
import { FunctionComponent, ReactElement, useMemo } from "react";
import styled from "styled-components";
import PageHeader from "../page-header/PageHeader";

export interface FormContainerLayoutProps {
    title: string;
    breadcrumbs?: string[]
    saveButton?: ReactElement,
    onBackAction: () => void,
}

const FormContainerLayout: FunctionComponent<FormContainerLayoutProps> = ({ title, breadcrumbs, saveButton, onBackAction, children }) => {

    const breadcrumbsContent = useMemo(() => (
        <Breadcrumbs>
            {breadcrumbs?.map(item => <BreadcrumbsItem text={item} key={item} />)}
        </Breadcrumbs>
    ), [])

    const actionsContent = useMemo(() => (
        <ButtonGroup>
            <Button onClick={onBackAction}>{'Voltar'}</Button>
            {saveButton}
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

export default FormContainerLayout;

const Content = styled.div`
    overflow-y: hidden;
    flex: 1;
`;