import React, { createContext, useMemo, useReducer } from 'react';
import { Assessment } from '../../../services/assessment/assessment.service';
import { Activity } from '../../../services/patient/patient-activity.service';
import { Patient } from '../../../services/patient/patient.service';
import { Team } from '../../../services/team/team.service';
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
type Action = { type: Actions, payload: Partial<PatientContextData> | null | Activity }
type PatientContextType = { state: Partial<PatientContextData> | null, dispatch: Dispatch }

const PatientContext = createContext<PatientContextType>({} as any);

export enum Actions {
    LOAD,
    UPDATE_ACTIVITY
}

function PatientReducer(state: Partial<PatientContextData> | null, action: Action) {

    const updateActivity = () => {
        const activityToUpdate = action.payload as Activity;
        const activities = state?.activities as Activity[];

        const indexInArray = activities?.findIndex(e => e.id == activityToUpdate.id) as number;

        if (indexInArray >= 0) {
            activities[indexInArray] = activityToUpdate;
        }
        else {
            activities.push(activityToUpdate);
        }

        return { ...state, ...{ activities: activities } }
    }

    switch (action.type) {
        case Actions.LOAD:
            return { ...state, ...action.payload } as PatientContextData | null;
        case Actions.UPDATE_ACTIVITY:
            return updateActivity();

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