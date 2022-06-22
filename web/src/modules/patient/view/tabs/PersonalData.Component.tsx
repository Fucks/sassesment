import { FunctionComponent } from "react";
import styled from "styled-components";
import { Patient } from "../../../../services/patient/patient.service";

export interface PersonalDataComponentProps {
    patient?: Patient;
    loading?: boolean;
}

const PersonalDataComponent: FunctionComponent<PersonalDataComponentProps> = ({ patient }) => {
    return (<Container>
        <p>
            Nome: <b>{patient?.name}</b>
        </p>
    </Container>);
}

export default PersonalDataComponent;

const Container = styled.div`
    margin: 64px
`;