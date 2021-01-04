import React, { useState } from 'react';
import styled from 'styled-components';
import SignupForm from './SignupForm';
import ProviderSignupForm from './ProviderSignupForm';
// import { StyledH1 } from '../styled-components/StyledHeadings';
import { StyledHorDiv } from './LoginModal';
import { MdError } from 'react-icons/md';

export default function SignupModal() {
    const [topError, setTopError] = useState<string | undefined>(undefined);

    return (
        <>
            <h1>Sign Up</h1>
            {topError ? (
                <TopError>
                    <MdError />
                    {topError}
                </TopError>
            ) : null}
            <ProviderSignupForm setTopError={setTopError} />
            <StyledHorDiv>
                <div></div>
                <h4>OR</h4>
                <div></div>
            </StyledHorDiv>
            <SignupForm setTopError={setTopError} />
        </>
    );
}

const TopError = styled.div`
    height: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.red};
    > svg {
        height: 100%;
        width: auto;
        margin-right: 10px;
        background: transparent;
        fill: ${(props) => props.theme.red};
    }
`;
