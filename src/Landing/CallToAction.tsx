import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { ModalContext } from '../Application';
import SignupModal from './SignupModal';

export default function CallToAction() {
    const { handleModal } = useContext(ModalContext)!;

    return (
        <StyledCallToAction>
            <h1>Take The Next Step In Improving Your Coding Skills</h1>
            <button onClick={() => handleModal(<SignupModal />)}>
                SIGN UP FOR FREE
            </button>
        </StyledCallToAction>
    );
}

const breathing = keyframes`
    from {
        box-shadow: 0 0 20px -8px ;
    }
    to {
        box-shadow: 0 0 20px 0px ;
    }
`;

const StyledCallToAction = styled.div`
    min-height: 400px;
    padding-top: 10%;
    color: white;
    display: flex;
    flex-direction: column;
    > h1 {
        width: 80%;
        font-size: 3.4em;
        font-weight: 500;
        color: ${(props) => props.theme.white};
        justify-self: center;
        align-self: center;
        text-align: center;
    }
    > button {
        margin-top: 30px;
        border-radius: 36px;
        padding: 20px;
        align-self: center;
        background-color: ${(props) => props.theme.green};
        color: ${(props) => props.theme.white};
        font-weight: 700;
        font-size: 1.2em;
        animation: ${breathing} 2s alternate-reverse infinite;
    }
`;
