import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import Button, { ButtonGroup } from "@atlaskit/button";
import { FunctionComponent, ReactElement, useMemo } from "react";
import styled from "styled-components";
import PageHeader from "../page-header/PageHeader";
import { ModalTransition } from '@atlaskit/modal-dialog';

export interface FormContainerLayoutProps {
    title: string;
    breadcrumbs?: string[]
    saveButton?: ReactElement,
    onBackAction: () => void,
    bottomBar?: ReactElement
}

const FormContainerLayout: FunctionComponent<FormContainerLayoutProps> = ({ title, breadcrumbs, saveButton, onBackAction, bottomBar, children }) => {

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
    ), [saveButton]);


    return (
        <ModalTransition>
            <PageHeader 
                breadcrumbs={breadcrumbsContent}
                actions={actionsContent}
                bottomBar={bottomBar}>
                {title}
            </PageHeader>
            <Content>
                {children}
            </Content>
        </ModalTransition>
    );
}

export default FormContainerLayout;

const Content = styled.div`
    overflow-y: hidden;
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%
`;