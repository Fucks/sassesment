import Avatar from "@atlaskit/avatar";
import styled from "styled-components";
import Initials from "../../../../../../components/initials/Initials";
import { Activity } from "../../../../../../services/patient/patient-activity.service";

interface ActivityRowProps {
    activity: Activity;
    isSelected?: boolean;
    onClick?: (activity: Activity) => void
}

export const ActivityRow = ({ activity, isSelected, onClick }: ActivityRowProps) => {

    return (
        <Row className={isSelected ? 'selected' : ''} onClick={() => onClick && onClick(activity)}>
            <Initials text={activity.name} />
            <InfoSection>
                <h4>{activity.name}</h4>
                <span>{activity.activityApplicationType.name} / {activity.helpType.name} / {activity.retryNumber} repetições</span>
            </InfoSection>
        </Row>
    )
}


const Row = styled.div`
    padding: 12px 16px;
    border: 2px solid #F7F7F7;
    height: 60px;
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    user-select: none;
    cursor: pointer;

    &.selected {
        border-color: #091E42;
    }
`;

const InfoSection = styled.div`
    margin-left: 16px;
    
    & > h4 {
        font-size: 14px;
        line-height: 1;
        margin: 0;
    }

    & > span {
        font-size: 12px;
        line-height: 1;
    }

    
`;