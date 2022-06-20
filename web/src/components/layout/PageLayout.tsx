import { FunctionComponent, useState } from "react";
import { AtlassianIcon } from '@atlaskit/logo';
import {
    PageLayout,
    Main,
    Content,
    LeftSidebarWithoutResize,
    TopNavigation
} from '@atlaskit/page-layout';
import { AtlassianNavigation, generateTheme, ProductHome } from "@atlaskit/atlassian-navigation";
import { ButtonItem as AtlassianButtonItem, NavigationFooter, NavigationHeader, NestableNavigationContent, Section, SideNavigation } from "@atlaskit/side-navigation";
import Authenticated from "../authenticated/Authenticated";
import { MenuOptions } from "../../constants/menu.constants";
import AuthenticationService from "../../services/Authentication.service";
import { SignIn } from '@atlaskit/atlassian-navigation';
import { Actions, useAuthentication } from "../../context/AutenticationContext";
import { useHistory } from "react-router";
import Logo from "../logo/Logo";
import styled from "styled-components";


const Layout: FunctionComponent = (props) => {

    const { state: auth, dispatch } = useAuthentication();
    const history = useHistory();
    const [smallMode, setSmallMode] = useState(window.innerWidth < 1024);

    const isUserAuthorizedToAccessMenu = (menuOption: any) => {

        if (!menuOption.role) {
            return true;
        }

        return menuOption.role.some((e: string) => auth!.authorities.findIndex(ee => ee.authority === e) >= 0);
    }

    const theme = generateTheme({
        name: 'high-contrast',
        backgroundColor: '#272727',
        highlightColor: '#E94E34',
    });

    const logout = () => {
        AuthenticationService.clear();
        dispatch({ type: Actions.LOGOUT, payload: null })
    }

    const signIn = () => (
        <SignIn onClick={logout} href="/" tooltip="Sair" />
    );

    return (
        <PageLayout>
            {
                <TopNavigation
                    testId="topNavigation"
                    id="product-navigation"
                    skipLinkTitle="Product Navigation"
                    height={60}
                    isFixed={false}>
                    <AtlassianNavigation
                        label="site"
                        theme={theme}
                        renderProductHome={() => (<ProductHome
                            href="/"
                            icon={AtlassianIcon}
                            logo={Logo}
                        />)}
                        renderSignIn={signIn}
                        primaryItems={[]}
                    />
                </TopNavigation>
            }
            <Content testId="content">
                {!smallMode &&
                    <LeftSidebarWithoutResize
                        testId="leftSidebar"
                        id="left-sidebar"
                        skipLinkTitle="Space Navigation"
                        isFixed={false}
                        width={265}>
                        <SideNavigation label="project" testId="side-navigation">
                            <NavigationHeader>
                                <Authenticated />
                            </NavigationHeader>
                            <NestableNavigationContent
                                initialStack={[]}
                                testId="nestable-navigation-content">
                                <Section>
                                    {MenuOptions.map(option => (
                                        isUserAuthorizedToAccessMenu(option) &&
                                        <AtlassianButtonItem key={option.url} onClick={() => history.push(option.url)} iconBefore={option.icon}>
                                            {option.title}
                                        </AtlassianButtonItem>
                                    ))}
                                </Section>
                            </NestableNavigationContent>
                            <NavigationFooter>
                                {/* <SampleFooter /> */}
                            </NavigationFooter>
                        </SideNavigation>
                    </LeftSidebarWithoutResize>
                }
                {
                    smallMode && <SmallNavigation>
                        <NavigationHeader>
                            <Authenticated smallMode={smallMode} />
                        </NavigationHeader>
                        <NestableNavigationContent
                            initialStack={[]}
                            testId="nestable-navigation-content">
                            <Section>
                                {MenuOptions.map(option => (
                                    isUserAuthorizedToAccessMenu(option) &&
                                    <ButtonItem key={option.url} onClick={() => history.push(option.url)}>
                                        {option.icon}
                                    </ButtonItem>
                                ))}
                            </Section>
                        </NestableNavigationContent>
                        <NavigationFooter>
                        </NavigationFooter>
                    </SmallNavigation>
                }
                {
                    <Main testId="main" id="main" skipLinkTitle="Main Content">
                        <div className="d-flex flex-column h-100" style={{overflowY: 'auto'}}>
                            {props.children}
                        </div>
                    </Main>
                }
            </Content>
        </PageLayout>
    );
};
export default Layout;


const SmallNavigation = styled.div`
    min-height: 100%;
    width: 58px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgb(235, 236, 240);
    background:#FAFBFC;
`

const ButtonItem = styled(AtlassianButtonItem)`
    padding: 8px 8px !important;
`


export const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    column-gap: 8px;
    justify-content: end;
    align-items: center;
`

