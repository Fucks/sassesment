import { FunctionComponent, useMemo, useState } from "react";
import { Activity } from "../../../../../services/patient/patient-activity.service";
import { ProgressIndicator } from '@atlaskit/progress-indicator';
import { usePatientContext } from "../../../context/PatientContext";
import { ActivityRow } from "./components/ActivityRow.Component";
import { ObjectiveRow } from "./components/ObjectiveRow.Component";

import Modal, { ActionProps } from '@atlaskit/modal-dialog'
import styled from "styled-components";
import { ActivityHistory, ActivityObjectiveHistory, Assessment } from "../../../../../services/patient/patient-assessment.service";

export interface AssesmentActivityExecutionFormProps {
    assessment: Assessment,
    onClose: (activity: ActivityHistory | null) => void
}

const AssesmentActivityExecutionForm: FunctionComponent<AssesmentActivityExecutionFormProps> = ({ assessment, onClose }) => {

    const title = 'Aplicar treino';

    const [activity, setActivity] = useState<Activity | undefined>();
    const [history, setHistory] = useState<ActivityHistory | undefined>();
    const [objectivesHistory, setObjectivesHistory] = useState<ActivityObjectiveHistory[]>([]);

    const [tab, setTab] = useState<number>(0);

    const onSelectActivity = (_activity: Activity) => {
        setActivity(_activity);
        setHistory({
            activity: _activity,
            startDate: new Date(),
            patient: assessment.patient,
            professional: assessment.professional,
            objectives: []
        })
        setObjectivesHistory(_activity.objectives
            .map(e => [...Array(_activity.retryNumber)].map(() => e))
            .reduce((a, b) => a.concat(b), [])
            .map((e, i) => ({ objective: e, __id: `#${i}`, order: i }))
        )
    }

    const updateObjectiveValue = (objective: ActivityObjectiveHistory, value: 'BAD' | 'SUCCESS' | 'SUCCESS_WITH_HELP') => {

        const objectives = objectivesHistory.map(e => {
            if (e.__id == objective.__id) {
                e.value = value;
            }
            return e;
        }) as ActivityObjectiveHistory[];

        setObjectivesHistory(objectives)
    }

    const onSave = () => {

        const entity = history as ActivityHistory;

        entity.endDate = new Date();
        entity.objectives = objectivesHistory;

        onClose(entity);
    }

    const actions = useMemo<ActionProps[]>(() => {

        if (tab === 0) {
            return [
                { text: 'Cancelar', onClick: () => onClose(null), appearance: "default" },
                { text: 'Proximo', isDisabled: !activity, onClick: () => setTab(1), appearance: "default" },
            ]
        }

        return [
            { text: 'Cancelar', onClick: () => onClose(null), appearance: "default" },
            { text: 'Anterior', onClick: () => setTab(0), appearance: "default" },
            { text: 'Salvar', onClick: onSave, appearance: "primary" },
        ]

    }, [tab, activity]);

    return (
        <Modal
            actions={actions}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEscapePress={false}
            onClose={() => onClose(null)}
            height="1200px"
            heading={
                <div>
                    <Header>{title}</Header>
                </div>
            }>
            <div >
                <ProgressIndicator values={[0, 1]} selectedIndex={tab} ></ProgressIndicator>

                {tab == 0 && <FirsStep onSelectActivity={onSelectActivity} selected={activity} />}
                {tab == 1 && <SecondStep objectives={objectivesHistory} activity={activity as Activity} setObjectiveValue={updateObjectiveValue} />}
            </div>
        </Modal >
    );
}

export default AssesmentActivityExecutionForm;


const FirsStep = ({ onSelectActivity, selected }: { onSelectActivity: (activity: Activity) => void, selected?: Activity }) => {

    const { state } = usePatientContext();

    return (
        <div className="py-4">
            <label>Escolha um treino para aplicar:</label>
            <div className="py-2">
                {state?.activities?.map(e => <ActivityRow key={e.id} activity={e} onClick={onSelectActivity} isSelected={selected?.id == e.id} />)}
            </div>
        </div>
    )
}

const SecondStep = ({ activity, objectives, setObjectiveValue }: { activity: Activity, objectives: ActivityObjectiveHistory[], setObjectiveValue: (objective: ActivityObjectiveHistory, value: 'BAD' | 'SUCCESS' | 'SUCCESS_WITH_HELP') => void }) => {

    const ObjectivesAndRepetitions = () => {
        return objectives.map((e, i) => <ObjectiveRow index={i + 1} objectiveHistory={e} setValue={setObjectiveValue} />)
    }

    return (
        <div className="py-4">
            <ActivityRow activity={activity as Activity} />

            <div className="py-1 mt-2">
                <Label>Procedimento:</Label>
                <InfoLabel className="mb-0">{activity.description}</InfoLabel>
            </div>

            <div className="py-1">
                <Label>Tempo de espera:</Label>
                <InfoLabel className="mb-0">{activity.helpDelay}</InfoLabel>
            </div>

            <div className="py-4 px-2">
                {ObjectivesAndRepetitions()}
            </div>
        </div>
    )
}

const Header = styled.h3`
    margin-bottom: 0px;
`;

const Label = styled.span`
    font-size: 12px;
    font-weight: 100;
    color: #A5ADBA;
`

const InfoLabel = styled.p`
    font-size: 14px;
    color: #42526E;
    font-weight: 400;
    margin-bottom: 0;
`