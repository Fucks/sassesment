import React, { createContext, useMemo, useReducer } from 'react';
import { AuthenticationInfo } from '../services/Authentication.service';

type Dispatch = (action: Action) => void;
type Action = { type: Actions, payload: AuthenticationInfo | null }
type AuthenticationContextType = { state: AuthenticationInfo | null, dispatch: Dispatch }

const AuthenticationContext = createContext<AuthenticationContextType>({} as any);

export enum Actions {
    LOGIN, LOGOUT
}

function authenticationReducer(state: AuthenticationInfo | null, action: Action) {
    switch (action.type) {
        case Actions.LOGIN:
            return action.payload;
        case Actions.LOGOUT:
            return null;
        default:
            throw new Error('Ação desconhecida.')
    }
}

const AuthenticationProvider = ({ children }: any) => {

    const [state, reducer] = useReducer(authenticationReducer, null);

    const value = useMemo(() => ({ state, dispatch: reducer }), [state]);

    return (<AuthenticationContext.Provider value={value as any}>{children}</AuthenticationContext.Provider>)
}

const useAuthentication = () => {

    const authentication = React.useContext(AuthenticationContext)

    return authentication
}

export { AuthenticationProvider, useAuthentication }