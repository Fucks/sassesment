import { ReactElement, useMemo } from "react";
import { useFormik } from "formik";
import styled from "styled-components";
import AtlassianPageHeader from "@atlaskit/page-header";
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left'
import Button, { ButtonGroup, LoadingButton } from "@atlaskit/button";
import MoreVerticalIcon from '@atlaskit/icon/glyph/more-vertical';
import Textfield from '@atlaskit/textfield';
import { isNullishCoalesce } from "typescript";
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';


export interface ActionItem {
    /**
     * Element to render before the item text.
     * Generally should be an [icon](https://atlaskit.atlassian.com/packages/design-system/icon) component.
     */
    icon?: React.ReactNode;
    /**
     * Event that is triggered when the element is clicked.
     */
    onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
    /**
     * Event that is triggered when the element has been pressed.
     */
    onMouseDown?: React.MouseEventHandler;
    /**
     * Makes the element appear disabled as well as removing interactivity.
     */
    isDisabled?: boolean;
    /**
     * Makes the element appear selected.
     */
    isSelected?: boolean;
    /**
     * Primary content for the item.
     */
    label?: React.ReactNode;
    /**
     * A `testId` prop is provided for specified elements,
     * which is a unique string that appears as a data attribute `data-testid` in the rendered code,
     * serving as a hook for automated tests.
     */
    testId?: string;
    /** 
     * The base styling to apply to the button 
     * */
    appearance?: "link" | "default" | "primary" | "danger" | "subtle" | "subtle-link" | "warning";

    type?: "button" | "submit" | "reset" | "searchbar";

    isLoading?: boolean;
}

interface PageHeaderProps {
    actions?: ActionItem[],
    children?: React.ReactNode,
    onBackAction?: () => void,
    onSearchAction?: (filter: string) => void,
    breadcrumbs?: ReactElement,
    className: string;
    bottomBar?: ReactElement
}

const PageHeader = ({ actions, children, className, bottomBar, breadcrumbs, onSearchAction, onBackAction }: PageHeaderProps) => {

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

    const mountSearchBar = () => {
        const hasSearchBar = actions?.find(e => e.type == "searchbar");

        if (!hasSearchBar) {
            return null;
        }

        return <form onSubmit={form.handleSubmit} className="flex-fill" >
            <Textfield name="filter" style={{ background: '#fff' }} autoComplete="off" onChange={form.handleChange} placeholder="Pesquisar" />
            <input type="submit" style={{ display: 'none' }} />
        </form>
    }

    const mountActionButtons = () => {

        const actionButtons = actions?.filter(e => e.type != "searchbar");

        if (!actionButtons) {
            return isNullishCoalesce;
        }

        return (actionButtons.map((e, i) => Object.keys(e).findIndex(e => e == 'isLoading') >= 0 ?
            <LoadingButton
                key={i}
                type={e.type as "button" | "submit" | "reset" || 'button'}
                onClick={e.onClick} isLoading={e.isLoading} appearance={e.appearance}>
                {e.label}
            </LoadingButton>
            : <Button
                key={i}
                type={e.type as "button" | "submit" | "reset" || 'button'}
                onClick={e.onClick}
                appearance={e.appearance}>
                {e.label}
            </Button>
        ))
    }

    const actionsContent = useMemo(() => (
        <ButtonGroup>
            {mountSearchBar()}
            {mountActionButtons()}
        </ButtonGroup>
    ), [actions]);

    return (
        <Container className={className}>
            <AtlassianPageHeader bottomBar={bottomBar} breadcrumbs={breadcrumbs} actions={actionsContent}>
                {children}
            </AtlassianPageHeader>
        </Container>
    )
}

const SmallPageHeader = ({ actions, children, className, onSearchAction, onBackAction }: PageHeaderProps) => {

    const submits = () => {
        const submits = actions?.filter(e => e.type == "submit");

        if (!submits || !submits.length) {
            return null;
        }

        return <ButtonGroup>
            {submits.map(e => (<IconButton isLoading={e.isLoading} type={e.type as "submit"}>{e.icon}</IconButton>))}
        </ButtonGroup>
    }

    const mountActionButtons = () => {

        if (!actions?.filter(e => e.type != "submit").length) {
            return null;
        }

        return (
            <DropdownMenu
                trigger={({ triggerRef, ...props }) => (
                    <IconButton
                        appearance="default"
                        {...props}
                        ref={triggerRef}>
                        <MoreVerticalIcon primaryColor="#172B4D" label="Opções" />
                    </IconButton>
                )}>
                <DropdownItemGroup>
                    {actions?.filter(e => e.type != "submit").map(e => <DropdownItem onClick={e.onClick}>{e.label}</DropdownItem>)}
                </DropdownItemGroup>
            </DropdownMenu>
        )
    }


    return (
        <SmallContainer className={className}>
            {onBackAction ? <IconButton onClick={onBackAction} appearance="link">
                <ArrowLeftIcon label="Voltar" primaryColor="#172B4D" />
            </IconButton> : <div style={{ marginLeft: '8px' }}></div>}

            <div className="header d-inline flex-fill"><h1>{children}</h1></div>

            {submits()}
            {mountActionButtons()}
        </SmallContainer>
    )
}

export { PageHeader, SmallPageHeader };

const Container = styled.div`
    padding: 24px 64px 0;
    background: #FAFBFC;
    margin: 0;
    border-bottom: 1px solid rgb(235, 236, 240);

    div:first-child{
        margin: 0;
    }
`;

const SmallContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 16px 8px 8px 8px;
    align-items: center;
    background: #FAFBFC;
    margin: 0;
    border-bottom: 1px solid rgb(235, 236, 240);

    & > .header > h1 {
        font-size: 20px;
        font-style: inherit;
        color: #172B4D;
        font-weight: 500;
        -webkit-letter-spacing: -0.01em;
        -moz-letter-spacing: -0.01em;
        -ms-letter-spacing: -0.01em;
        letter-spacing: -0.01em;
        margin-top: 40px;
        line-height: 20px;
        margin-top: 0;
        outline: none;
        text-align: center;
        display: inline;
        flex: 1
    }
`;

const IconButton = styled(LoadingButton)`
    align-items: center !important;

    &:hover, &:focus{
        box-shadow: none !important;
        background: rgba(9,30,66,0.04) !important;
    }

    & > span {
        display: flex;
    }

    & span[role="img"] {
        vertical-align: middle;
    }
`;

export const SvgSaveIcon = () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
        <path fill="currentColor" d="M 22.285156 0 C 21.335938 0 2.679688 0 1.714844 0 C 0.769531 0 0 0.769531 0 1.714844 L 0 22.285156 C 0 23.230469 0.769531 24 1.714844 24 C 1.714844 24 21.273438 24 22.285156 24 C 23.230469 24 24 23.230469 24 22.285156 L 24 1.714844 C 24 0.769531 23.230469 0 22.285156 0 Z M 12.824219 1.566406 L 15.484375 1.566406 L 15.484375 4.40625 L 12.824219 4.40625 Z M 5.59375 1.566406 L 11.257812 1.566406 L 11.257812 5.191406 C 11.257812 5.621094 11.609375 5.972656 12.042969 5.972656 L 16.269531 5.972656 C 16.699219 5.972656 17.050781 5.621094 17.050781 5.191406 L 17.050781 1.566406 L 18.425781 1.566406 L 18.425781 7.808594 L 5.59375 7.808594 Z M 5.582031 22.433594 L 5.582031 16.105469 L 18.417969 16.105469 L 18.417969 22.433594 Z M 22.433594 22.285156 C 22.433594 22.367188 22.367188 22.433594 22.285156 22.433594 L 19.980469 22.433594 L 19.980469 15.320312 C 19.980469 14.890625 19.632812 14.539062 19.199219 14.539062 L 4.800781 14.539062 C 4.367188 14.539062 4.019531 14.890625 4.019531 15.320312 L 4.019531 22.433594 L 1.714844 22.433594 C 1.632812 22.433594 1.566406 22.367188 1.566406 22.285156 L 1.566406 1.714844 C 1.566406 1.632812 1.632812 1.566406 1.714844 1.566406 L 4.027344 1.566406 L 4.027344 8.589844 C 4.027344 9.023438 4.378906 9.371094 4.808594 9.371094 L 19.210938 9.371094 C 19.640625 9.371094 19.992188 9.023438 19.992188 8.589844 L 19.992188 1.566406 L 22.285156 1.566406 C 22.367188 1.566406 22.433594 1.632812 22.433594 1.714844 Z M 22.433594 22.285156 " />
    </svg>
)