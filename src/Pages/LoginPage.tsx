import React from "react";
import styled from "styled-components";
import LoginForm from "../Components/Auth/LoginForm";
import GithubLoginForm from "../Components/Auth/GithubLoginForm";
import { StyledButton } from "../styled-components/formStyles";
import { FaGithub } from "react-icons/fa";

export default () => {
    return (
        <Login>
            <h1>Login</h1>
            <LoginForm />
            <span>
                <div></div>
                OR
                <div></div>
            </span>
            <StyledButton>
                <FaGithub />
                Log in with Github
            </StyledButton>
        </Login>
    );
};

const Login = styled.div`
    min-height: 100%;
    width: 100%;
    padding: 5%;
    display: flex;
    flex-direction: column;
    > span {
        width: 100%;
        padding: 5%;
        display: flex;
        align-items: center;
        font-size: 1em;
        font-weight: 500;
        > div {
            width: 50%;
            border-top: 1px solid ${(props) => props.theme.verydark};
        }
    }
`;
