import { FunctionComponent, useMemo } from "react";
import { AtlassianIcon, AtlassianLogo } from '@atlaskit/logo';
import {
    PageLayout,
    Main,
    Content,
    LeftSidebarWithoutResize,
    TopNavigation
} from '@atlaskit/page-layout';
import { AtlassianNavigation, generateTheme, ProductHome } from "@atlaskit/atlassian-navigation";
import { LinkItem, NavigationFooter, NavigationHeader, NestableNavigationContent, Section, SideNavigation } from "@atlaskit/side-navigation";
import Authenticated from "../authenticated/Authenticated";
import { MenuOptions } from "../../constants/menu.constants";
import AuthenticationService, { AuthenticationInfo } from "../../services/Authentication.service";
import { SignIn } from '@atlaskit/atlassian-navigation';

const Layout: FunctionComponent = (props) => {

    const auth = useMemo<AuthenticationInfo>(() => AuthenticationService.getUserInfo(), []);

    const isUserAuthorizedToAccessMenu = (menuOption: any) => {

        if (!menuOption.role) {
            return true;
        }

        return menuOption.role.some((e: string) => auth.authorities.findIndex(ee => ee.authority === e) >= 0);
    }

    const theme = generateTheme({
        name: 'high-contrast',
        backgroundColor: '#272727',
        highlightColor: '#E94E34',
    });

    const signIn = () => (
        <SignIn onClick={AuthenticationService.clear} href="/" tooltip="Sair" />
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
                            logo={AtlassianLogo}
                        />)}
                        renderSignIn={signIn}
                        primaryItems={[]}
                    />
                </TopNavigation>
            }
            <Content testId="content">
                {
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
                                        <LinkItem href={option.url} iconBefore={option.icon}>
                                            {option.title}
                                        </LinkItem>
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
                    <Main testId="main" id="main" skipLinkTitle="Main Content">
                        {props.children}
                    </Main>
                }
            </Content>
        </PageLayout>
    );
};
export default Layout;
