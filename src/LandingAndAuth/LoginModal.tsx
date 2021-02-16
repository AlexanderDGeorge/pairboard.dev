import React from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import { FaGithub } from 'react-icons/fa';
import { StyledGithubButton } from '../styled-components/StyledButtons';
import useLogin from './util/useLogin';

export default function LoginModal() {
    const { loginWithGithub, loginAsDemo } = useLogin();

    return (
        <>
            <h1 style={{ marginBottom: 10 }}>Sign In</h1>
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
            <DemoButton onClick={loginAsDemo}>log in as a demo user</DemoButton>
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

const DemoButton = styled.button`
    background: transparent;
    color: ${(props) => props.theme.blue};
    margin: 10px 0;
    outline: none;
    &:hover {
        text-decoration: underline;
    }
`;
