import React, { useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../Application';
import SignupModal from './SignupModal';

export default function CallToAction() {
    const { handleModal } = useContext(ModalContext)!;

    return (
        <StyledCallToAction>
            <h1>take the next step in improving your coding skills</h1>
            <button onClick={() => handleModal(<SignupModal />)}>
                SIGN UP FOR FREE
            </button>
        </StyledCallToAction>
    );
}

const StyledCallToAction = styled.div`
    min-height: 400px;
    padding-top: 20%;
    color: white;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 600px) {
        padding-top: 30%;
    }
    @media screen and (max-width: 1000px) {
        padding-top: 24%;
    }
    > h1 {
        width: 80%;
        font-size: 3em;
        font-weight: 500;
        color: ${(props) => props.theme.white};
        justify-self: center;
        align-self: center;
        text-align: center;
    }
    > button {
        margin-top: 10px;
        border-radius: 18px;
        padding: 20px;
        box-shadow: 4px 4px 20px -8px black;
        align-self: flex-end;
        background-color: ${(props) => props.theme.green};
        color: ${(props) => props.theme.white};
        font-weight: 700;
    }
`;
