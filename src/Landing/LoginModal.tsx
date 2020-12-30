import React from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import { FaGithub } from 'react-icons/fa';
import { StyledGithubButton } from '../styled-components/StyledButtons';
import useLogin from './util/useLogin';
import { StyledH1 } from '../styled-components/StyledHeadings';

export default function LoginModal() {
    const { loginWithGithub } = useLogin();

    return (
        <>
            <StyledH1>Sign In</StyledH1>
            <StyledGithubButton onClick={loginWithGithub}>
                <FaGithub />
                Sign In with Github
            </StyledGithubButton>
            <StyledHorDiv>
                <div></div>
                <h4>OR</h4>
                <div></div>
            </StyledHorDiv>
            <LoginForm />
        </>
    );
}

export const StyledHorDiv = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 20px 0;
    display: flex;
    align-items: center;
    font-size: 1em;
    font-weight: 500;
    > div {
        width: 50%;
        border-top: 2px solid ${(props) => props.theme.dark};
    }
    > h4 {
        min-height: 40px;
        height: 40px;
        min-width: 40px;
        width: 40px;
        padding: 5px;
        border-radius: 50%;
        background-color: ${(props) => props.theme.dark};
        color: ${(props) => props.theme.white};
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
