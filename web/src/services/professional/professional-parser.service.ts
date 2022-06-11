import { SelectOption } from "../../components/select/AsyncSelect";
import { Occupation } from "../occupation/occupation.service";
import { Profile } from "../profile/profile.service";
import { ParserAdapter } from "../util/parser";
import { Professional } from "./professional.service";

export interface ProfessionalFormModel {
    id?: number;
    name: string;
    email: string;
    password?: string;
    occupation?: SelectOption<Occupation>;
    profile?: SelectOption<Profile>;
}

export class ProfessionalParserAdapter implements ParserAdapter<Professional, ProfessionalFormModel> {

    serializeTo(model: Professional): ProfessionalFormModel {

        return {
            ...model,
            occupation: model.occupation && { label: model.occupation?.name, value: model.occupation },
            profile: model.profile && { label: model.profile?.name, value: model.profile }
        }
    }

    serializeFrom(entity: ProfessionalFormModel): Professional {
        return {
            ...entity,
            occupation: entity.occupation?.value,
            profile: entity.profile?.value
        }
    }

}