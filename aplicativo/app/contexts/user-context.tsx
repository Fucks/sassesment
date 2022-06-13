import React, { createContext, useMemo, useReducer } from 'react';
import { Authentication } from '../services/Authentication.service';

type Dispatch = (action: Action) => void;
type Action = { type?: Actions, payload: Authentication | null }
type AuthenticationContextType = { state: Authentication | null, dispatch: Dispatch }

const AuthenticationContext = createContext<AuthenticationContextType>({} as any);

export enum Actions {
    LOGIN, LOGOUT
}

const reducerFn = (state, action) => {
    switch (action.type) {
        case 'changeTheme':
        case Actions.LOGIN:
            return action.payload;
        case Actions.LOGOUT:
            return null;

        default:
            return state;
    }
};

const AuthenticationProvider = ({ children, initialValue }: { children: any, initialValue: Authentication | null }) => {

    const [state, reducer] = useReducer(reducerFn, initialValue);
    const value = useMemo(() => ({ state, dispatch: reducer }), [state]);

    return (<AuthenticationContext.Provider value={value as any}>{children}</AuthenticationContext.Provider>)
}

const useAuthentication = () => {

    const authentication = React.useContext(AuthenticationContext)

    return authentication
}

export { AuthenticationProvider, useAuthentication }