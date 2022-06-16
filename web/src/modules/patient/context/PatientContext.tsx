import React, { createContext, useMemo, useReducer } from 'react';
import { Activity } from '../../../services/patient/patient-activity.service';
import { Assessment } from '../../../services/patient/patient-assessment.service';
import { Patient } from '../../../services/patient/patient.service';
import { Team } from '../../../services/team/team.service';
import { updateArray } from '../../../services/util/helpers';
import { Page } from '../../../services/util/page';

export interface PatientContextData {
    patient: Patient,
    activities: Activity[],
    teams: Team[],
    teamsPage?: Page,
    assessments: Assessment[],
    assessmentPage: Page
}

type Dispatch = (action: Action) => void;
type Action = { type: Actions, payload: Partial<PatientContextData> | null | Activity | Assessment }
type PatientContextType = { state: Partial<PatientContextData> | null, dispatch: Dispatch }

const PatientContext = createContext<PatientContextType>({} as any);

export enum Actions {
    LOAD,
    UPDATE_ACTIVITY,
    UPDATE_ASSESSMENTS
}


function PatientReducer(state: Partial<PatientContextData> | null, action: Action) {

    switch (action.type) {
        case Actions.LOAD:
            return { ...state, ...action.payload } as PatientContextData | null;
        case Actions.UPDATE_ACTIVITY:
            const activities = updateArray<Activity>(state?.activities as Activity[], (e: Activity) => e.id == (action.payload as Activity).id, (action.payload as Activity));
            return { ...state, ...{ activities } }

        case Actions.UPDATE_ASSESSMENTS:
            const assessments = updateArray<Assessment>(state?.assessments as Assessment[], (e: Assessment) => e.id == (action.payload as Assessment).id, (action.payload as Assessment))
            return { ...state, ...{ assessments } }
        default:
            throw new Error('Ação desconhecida.')
    }
}

const PatientProvider = ({ children }: any) => {

    const [state, reducer] = useReducer(PatientReducer, null);

    const value = useMemo(() => ({ state, dispatch: reducer }), [state]);

    return (<PatientContext.Provider value={value as PatientContextType}>{children}</PatientContext.Provider>)
}

const usePatientContext = () => {

    const ctx = React.useContext(PatientContext)

    return ctx
}

export { PatientProvider, usePatientContext }