import Avatar from "@atlaskit/avatar";
import { FunctionComponent, useMemo } from "react";
import styled from "styled-components";
import AuthenticationService, { AuthenticationInfo } from "../../services/Authentication.service";

const Authenticated: FunctionComponent = () => {

    const userInfo = useMemo<AuthenticationInfo>(() => AuthenticationService.getUserInfo(), []);

    return <SideNavHeaderContainer1>
        <SideNavHeaderContainer>
            <Avatar
                presence={'online'}
            />
            <HeaderTitle>
                <h2>{userInfo.name}</h2>
                <span>{userInfo.occupation}</span>
            </HeaderTitle>
        </SideNavHeaderContainer>
    </SideNavHeaderContainer1>;
}

export default Authenticated;


const SideNavHeaderContainer1 = styled.div`
    cursor: pointer;
    font-size: 14px;
    display: flex;
    box-sizing: border-box;
    padding: 8px 10px;
    border-radius: 3px;
    background-color: rgb(250, 251, 252);
    color: rgb(66, 82, 110);
    user-select: auto;
`;

const SideNavHeaderContainer = styled.div`
    display: flex;
    min-height: 24px;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
`;

const HeaderTitle = styled.span`
    flex-grow: 1;
    text-align: left;
    overflow: hidden;
    outline: none;
    display: flex;
    flex-direction: column;
    line-height: 1.22;
    margin-left: 16px;

    h2 {
        font-size: 14px;
        letter-spacing: -0.003em;
        font-weight: 600;
        color: rgb(66, 82, 110);
        margin: 0
    }

    span {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: rgb(107, 119, 140);
        margin-top: 3px;
        font-size: 12px;
    }
`;