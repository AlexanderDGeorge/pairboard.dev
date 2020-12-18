import React from 'react';
import styled from 'styled-components';
import LoginForm from '../Auth/LoginForm';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { StyledH1 } from '../styled-components/StyledHeadings';
import { StyledGithubButton } from '../styled-components/StyledButtons';
import useLogin from '../Auth/util/useLogin';

export default function LoginPage() {
    const { loginWithGithub } = useLogin();

    return (
        <Login>
            <div>
                <StyledH1>Log In</StyledH1>
                <StyledGithubButton onClick={loginWithGithub}>
                    <FaGithub />
                </StyledGithubButton>
                <StyledHorDiv>
                    <div></div>
                    <h4>OR</h4>
                    <div></div>
                </StyledHorDiv>
                <LoginForm />
                <Link style={{ marginTop: '10%' }} to="/signup">
                    meant to sign up?
                </Link>
                <Link to="/password">forgot password?</Link>
            </div>
        </Login>
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
        border-top: 1px solid ${(props) => props.theme.accent};
    }
    > h4 {
        min-height: 40px;
        height: 40px;
        min-width: 40px;
        width: 40px;
        padding: 5px;
        border-radius: 50%;
        background-color: ${(props) => props.theme.accent};
        color: ${(props) => props.theme.white};
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const Login = styled.div`
    min-height: 80%;
    width: 100%;
    padding: 100px 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.dark};
    > div {
        min-width: 300px;
        width: 60%;
        max-width: 500px;
        border-radius: 10px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: ${(props) => props.theme.white};
        box-shadow: 0 5px 20px -4px ${(props) => props.theme.black};
        > form {
            width: 100%;
        }
        > a {
            height: 50px;
            width: 100%;
            max-width: 600px;
            text-align: center;
            color: ${(props) => props.theme.blue};
            text-decoration: none;
            &:hover {
                text-decoration: underline;
            }
        }
    }
`;
