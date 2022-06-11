import { SelectOption } from "../../components/select/AsyncSelect";
import { ParserAdapter } from "../util/parser";
import { Activity, ActivityApplicationType, ActivityHelpType, Objective } from "./patient-activity.service";

export interface ActivityFormModel {
    id?: number;
    name: string;
    createdAt?: Date;
    description?: string;
    activityApplicationType: SelectOption<ActivityApplicationType>;
    helpType: SelectOption<ActivityHelpType>;
    retryNumber: number;
    helpDelay: number;
    objectives: Objective[]
}

export class PatientActivityParser implements ParserAdapter<Activity, ActivityFormModel>{

    serializeTo(entity: Activity): ActivityFormModel {
        return {
            ...entity,
            activityApplicationType: { label: entity.activityApplicationType.name, value: entity.activityApplicationType },
            helpType: { label: entity.helpType.name, value: entity.helpType }
        }

    }

    serializeFrom(model: ActivityFormModel): Activity {
        return {
            ...model,
            activityApplicationType: model.activityApplicationType.value,
            helpType: model.helpType.value
        }
    }


}