import Icon from '@atlaskit/icon';
import styled from "styled-components";
import Button from "@atlaskit/button";
import { useState } from "react";
import { ObjectiveRow } from "./ObjectiveRow.Component";
import { dateAndTimeToString, differenceBetweenDates } from "../../../../../../services/util/date-helper";
import { ActivityHistory } from '../../../../../../services/patient/patient-assessment.service';

interface AssessmentPlanRowProps {
    activityHistory: ActivityHistory;
}

const AssessmentPlanRow = ({ activityHistory }: AssessmentPlanRowProps) => {

    const activity = activityHistory.activity;

    const [isExpanded, setExpanded] = useState<boolean>(false);

    const onExpand = () => {
        setExpanded(!isExpanded);
    }

    return (
        <Container>
            <Row className='row'>
                <div className='col-9'>
                    <h4 className="title text-truncate d-inline-block">{activity.name}</h4>
                    <Subtitle className='text-truncate'>{dateAndTimeToString(activityHistory.startDate)} - {activity.activityApplicationType.name} ({activity.helpType.name}) - {activityHistory.professional?.name}</Subtitle>
                </div>

                <TogglableButton autoFocus={false} type="button" appearance="link" onClick={onExpand} className={isExpanded ? 'expanded' : ''}>
                    <Icon glyph={ChevronLeft} label="Expandir" size="medium" primaryColor="#091E42" />
                </TogglableButton>
            </Row>
            {isExpanded &&
                <Panel className={isExpanded ? 'open' : 'close'}>
                    <Subtitle>Duração: {differenceBetweenDates(activityHistory.startDate, activityHistory.endDate as Date)}</Subtitle>
                    <Subtitle>Tempo de espera: {activity.helpDelay} segundos</Subtitle>
                    <div className="py-2">
                        {activityHistory.objectives.map((e, i) => <ObjectiveRow objectiveHistory={e} index={i} />)}
                    </div>
                </Panel>
            }

        </Container>
    )
}

export const NewActivityHistoryRow = ({ onClick }: { onClick: () => void }) => {

    return (
        <Container style={{ marginTop: '16px' }}>
            <Button onClick={onClick} appearance="link">
                <Icon glyph={Plus} label="Executar treino" />
            </Button>
        </Container>
    );
}

export default AssessmentPlanRow;

const Panel = styled.div`
    transition: display 250ms ease-in !important;
    border-top: 1px solid rgba(9, 30, 66, 0.04);
    padding: 16px 0;
`;

const Container = styled.div`
    margin: 4px 0;
    padding: 0 16px;
    background: rgba(9, 30, 66, 0.04);
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    
`;

const Subtitle = styled.div`
    font-size: 12px;
    color: #5E6C84;
    font-weight: 200;
`
const Row = styled.div`
    display: flex;
    padding: 16px 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    h4.title {
        font-size: 16px;
        color: #091E42;
        font-weight: 400;
        margin: 0;
    }

    button {
        font-size: 10px
    }
`;

const TogglableButton = styled(Button)`
    transition: transform 250ms !important;

    &.expanded {
        transform: rotate(-90deg);
    }

    &:focus {
        box-shadow: none !important;
    }
`

const ChevronLeft = () => (
    <svg viewBox="0 0 22 22">
        <path d="M0.34314 9.8324L9.83288 0.34314C10.2904 -0.11438 11.0326 -0.11438 11.4901 0.34314L12.597 1.45007C13.0541 1.9071 13.0546 2.64734 12.599 3.10535L5.078 10.661L12.5985 18.2172C13.0546 18.6752 13.0536 19.4154 12.5966 19.8724L11.4896 20.9794C11.0321 21.4369 10.2899 21.4369 9.8324 20.9794L0.34314 11.4896C-0.11438 11.0321 -0.11438 10.2899 0.34314 9.8324Z" fill="currentColor" />
    </svg>
)

const Plus = () => (
    <svg width="20" height="20" viewBox="0 0 20 20">
        <path d="M18.5714 7.85714H12.1429V1.42857C12.1429 0.639732 11.5031 0 10.7143 0H9.28571C8.49687 0 7.85714 0.639732 7.85714 1.42857V7.85714H1.42857C0.639732 7.85714 0 8.49687 0 9.28571V10.7143C0 11.5031 0.639732 12.1429 1.42857 12.1429H7.85714V18.5714C7.85714 19.3603 8.49687 20 9.28571 20H10.7143C11.5031 20 12.1429 19.3603 12.1429 18.5714V12.1429H18.5714C19.3603 12.1429 20 11.5031 20 10.7143V9.28571C20 8.49687 19.3603 7.85714 18.5714 7.85714Z" fill="#253858" />
    </svg>

)