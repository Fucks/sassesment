import { FunctionComponent } from "react";
import styled from "styled-components";

export interface InitialsProps {
    text: string
}

const Initials: FunctionComponent<InitialsProps> = ({ text }) => {

    const getInitials = () => {

        const words = text.split(' ');
        const numberOfWords = words.length;

        if (numberOfWords > 1) {
            return (words[0][0] + words[1][0]).toUpperCase();
        }

        return (words[0][0] + words[0][0]).toUpperCase()
    }

    return (<Container>
        <Span1>
            <Span2>
                <Text>
                    {getInitials()}
                </Text>
            </Span2>
        </Span1>
    </Container>);
}

export default Initials;

const Container = styled.div`
    display: inline-block;
    position: relative;
    outline: 0px;
`;

const Span1 = styled.span`
    height: 32px;
    width: 32px;
    align-items: stretch;
    background-color: #FFFFFF;
    border-radius: 50%;
    box-sizing: content-box;
    cursor: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    outline: none;
    overflow: hidden;
    position: static;
    transform: translateZ(0);
    transition: transform 200ms,opacity 200ms;
    box-shadow: 0 0 0 2px #ffffff;
    border: none;
    margin: 2px;
    padding: 0;
    font-size: inherit;
    font-family: inherit;
`;

const Span2 = styled.span`
    background-color: #8993A4;
    width: 100%;
    height: 100%;
    display: block;
`;

const Text = styled.span`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
    font-weight: 700;
    color: white;
    font-size: 16px;
`;