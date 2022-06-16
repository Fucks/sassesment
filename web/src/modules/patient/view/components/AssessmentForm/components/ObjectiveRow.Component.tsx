import styled from "styled-components"
import Icon from '@atlaskit/icon';
import Button from "@atlaskit/button";
import { ActivityObjectiveHistory } from "../../../../../../services/patient/patient-assessment.service";

interface ObjectiveRowProps {
    index: number;
    objectiveHistory: ActivityObjectiveHistory,
    setValue?: (objectiveHistory: ActivityObjectiveHistory, value: 'BAD' | 'SUCCESS' | 'SUCCESS_WITH_HELP') => void
}

export const ObjectiveRow = ({ index, objectiveHistory, setValue }: ObjectiveRowProps) => {

    return (
        <Row>
            <div className="py-3">
                <span className="px-2">#{index}</span>
                <span className="px-2">{objectiveHistory.objective.name}</span>
            </div>
            <ActionsSection>
                <Button appearance="link" onClick={() => setValue && setValue(objectiveHistory, 'BAD')} isDisabled={!setValue}>
                    <Icon glyph={SvgMinus} label="" size="large" primaryColor={objectiveHistory.value == 'BAD' ? '#FF7452' : '#F5F6F8'} />
                </Button>
                <Button appearance="link" onClick={() => setValue && setValue(objectiveHistory, 'SUCCESS')} isDisabled={!setValue}  >
                    <Icon glyph={SvgPlus} label="" size="large" primaryColor={objectiveHistory.value == 'SUCCESS' ? '#57D9A3' : '#F5F6F8'} />
                </Button>
                <Button appearance="link" onClick={() => setValue && setValue(objectiveHistory, 'SUCCESS_WITH_HELP')} isDisabled={!setValue}  >
                    <Icon glyph={SvgPlusCircle} label="" size="large" primaryColor={objectiveHistory.value == 'SUCCESS_WITH_HELP' ? '#0065FF' : '#F5F6F8'} />
                </Button>
            </ActionsSection>
        </Row>
    )

}

const Row = styled.div`
    height: 54px;
    border-bottom: 1px solid rgba(9, 30, 66, 0.04);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px
`;

const ActionsSection = styled.div`
    padding: 16px 0;
    display: flex;
`;

const SvgMinus = () => (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="currentColor">
        <path d="M12.1094 0C5.41992 0 0 5.41992 0 12.1094C0 18.7988 5.41992 24.2188 12.1094 24.2188C18.7988 24.2188 24.2188 18.7988 24.2188 12.1094C24.2188 5.41992 18.7988 0 12.1094 0ZM5.66406 14.0625C5.3418 14.0625 5.07812 13.7988 5.07812 13.4766V10.7422C5.07812 10.4199 5.3418 10.1562 5.66406 10.1562H18.5547C18.877 10.1562 19.1406 10.4199 19.1406 10.7422V13.4766C19.1406 13.7988 18.877 14.0625 18.5547 14.0625H5.66406Z" fill="currentColor"/>
    </svg>
)

const SvgPlus = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor">
        <path d="M20.3125 8.59375H13.2812V1.5625C13.2812 0.699707 12.5815 0 11.7188 0H10.1562C9.29346 0 8.59375 0.699707 8.59375 1.5625V8.59375H1.5625C0.699707 8.59375 0 9.29346 0 10.1562V11.7188C0 12.5815 0.699707 13.2812 1.5625 13.2812H8.59375V20.3125C8.59375 21.1753 9.29346 21.875 10.1562 21.875H11.7188C12.5815 21.875 13.2812 21.1753 13.2812 20.3125V13.2812H20.3125C21.1753 13.2812 21.875 12.5815 21.875 11.7188V10.1562C21.875 9.29346 21.1753 8.59375 20.3125 8.59375Z" fill="currentColor"/>
    </svg>
)

const SvgPlusCircle = () => (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="currentColor">
        <path d="M12.1094 0C5.41992 0 0 5.41992 0 12.1094C0 18.7988 5.41992 24.2188 12.1094 24.2188C18.7988 24.2188 24.2188 18.7988 24.2188 12.1094C24.2188 5.41992 18.7988 0 12.1094 0ZM19.1406 13.4766C19.1406 13.7988 18.877 14.0625 18.5547 14.0625H14.0625V18.5547C14.0625 18.877 13.7988 19.1406 13.4766 19.1406H10.7422C10.4199 19.1406 10.1562 18.877 10.1562 18.5547V14.0625H5.66406C5.3418 14.0625 5.07812 13.7988 5.07812 13.4766V10.7422C5.07812 10.4199 5.3418 10.1562 5.66406 10.1562H10.1562V5.66406C10.1562 5.3418 10.4199 5.07812 10.7422 5.07812H13.4766C13.7988 5.07812 14.0625 5.3418 14.0625 5.66406V10.1562H18.5547C18.877 10.1562 19.1406 10.4199 19.1406 10.7422V13.4766Z" fill="currentColor" />
    </svg>
)