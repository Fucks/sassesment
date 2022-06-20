import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import Button, { LoadingButton } from "@atlaskit/button";
import { FunctionComponent, ReactElement, useMemo } from "react";
import styled from "styled-components";
import { ModalTransition } from '@atlaskit/modal-dialog';
import { ActionItem, PageHeader, SmallPageHeader } from "../page-header/PageHeader";

export interface FormContainerLayoutProps {
    title: React.ReactNode;
    breadcrumbs?: string[]
    actions?: ActionItem[],
    onBackAction: () => void,
    bottomBar?: ReactElement
}

const FormContainerLayout: FunctionComponent<FormContainerLayoutProps> = ({ title, breadcrumbs, actions, onBackAction, bottomBar, children }) => {

    const breadcrumbsContent = useMemo(() => (
        <Breadcrumbs>
            {breadcrumbs?.map(item => <BreadcrumbsItem text={item} key={item} />)}
        </Breadcrumbs>
    ), [])

    return (
        <ModalTransition>
            <PageHeader className="d-none d-md-block d-lg-block d-xlg-block d-xxlg-block d-xxxlg-block"
                breadcrumbs={breadcrumbsContent}
                actions={actions}
                onBackAction={onBackAction}
                bottomBar={bottomBar}>
                {title}
            </PageHeader>
            <SmallPageHeader className="d-flex d-md-none d-lg-none d-xlg-none d-xxlg-none d-xxxlg-none"
                actions={actions}
                onBackAction={onBackAction}>
                {title}
            </SmallPageHeader>
            <Content className="container">
                {children}
            </Content>
            {bottomBar && <MobileBottomBar className="d-block d-md-none d-lg-none d-xlg-none d-xxlg-none d-xxxlg-none">
                {bottomBar}
            </MobileBottomBar>}
        </ModalTransition>
    );
}

export default FormContainerLayout;

const Content = styled.div`
     padding: 0 64px;
     margin: 0 0 64px 0;
     flex: 1;
`;

const MobileBottomBar = styled.div`
    height: 58px;
    background: #FAFBFC;
    border-top: 1px solid rgb(235,236,240);
`