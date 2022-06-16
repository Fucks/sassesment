import { Activity, Objective } from "../patient/patient-activity.service";
import { Patient } from "../patient/patient.service";
import { Professional } from "../professional/professional.service";

export interface ActivityObjectiveHistory{
    __id?: string;
    objective: Objective,
    order: number;
    value?: 'BAD' | 'SUCCESS' | 'SUCCESS_WITH_HELP'
}

export interface ActivityHistory {
    activity: Activity,
    professional: Professional,
    patient: Patient,
    startDate: Date,
    endDate?: Date,
    objectives: ActivityObjectiveHistory[]
}

export interface Assessment {
    id?: number;
    patient: Patient,
    professional: Professional,
    startDate: Date,
    endDate?: Date,
    assessmentPlan: ActivityHistory[]
}