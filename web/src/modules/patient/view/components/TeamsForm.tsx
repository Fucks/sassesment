import { Formik } from "formik";
import { FunctionComponent, useMemo, useState } from "react";
import Modal from '@atlaskit/modal-dialog'
import AsyncSelect, { SelectOption } from "../../../../components/select/AsyncSelect";
import styled from "styled-components";
import { Team, TeamService } from "../../../../services/team/team.service";

export interface TeamsFormProps {
    id: number;
    onClose: (team: Team | null) => void
}


const TeamsForm: FunctionComponent<TeamsFormProps> = ({ id, onClose }) => {

    const service = useMemo(() => new TeamService(), []);

    const title = 'Vincular equipe';

    const [error, setError] = useState<any>();

    const handleTeams = async (filter: string) => {
        let teams;

        try {
            teams = await service.filterTeamsNotAttachedToPatient(filter, id, { page: 0, size: 10 });
        }
        catch (err) {
            setError(err);
            throw err;
        }

        return teams.content.map(e => ({ label: e.name, value: e }));
    }

    const handleAdd = async ({ team }: { team: SelectOption<Team> }) => {

        try {
            const response = await service.addPatient(team.value.id as number, id);
            onClose(response);
        }
        catch (err) {
            setError(err);
            throw err;
        }
    }

    const form = {
        initialValues: {} as { team: SelectOption<Team> },
        enableReinitialize: true,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: handleAdd
    }

    return (
        <Modal
            actions={[
                { text: 'Vincular', appearance: 'primary', type: 'submit', form: "teams" },
                { text: 'Cancelar', onClick: () => onClose(null) },
            ]}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEscapePress={false}
            onClose={() => onClose(null)}
            height="300px"
            heading={
                <div>
                    <Header>{title}</Header>
                </div>
            } >
            <Formik {...form}>
                {(formProps) => (
                    <form id="teams" onSubmit={formProps.handleSubmit} style={{ position: 'absolute', width: 'calc(100% - 48px)' }}>
                        <AsyncSelect fetch={handleTeams} label="Equipe" name="team" required />
                    </form>
                )}
            </Formik>
        </Modal >
    );
}


export default TeamsForm;

const Header = styled.h3`
    margin-bottom: 0px;
`;