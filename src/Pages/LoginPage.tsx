import React from "react";
import styled from "styled-components";
import LoginForm from "../Components/Auth/LoginForm";
import GithubLoginForm from "../Components/Auth/GithubLoginForm";

export default () => {
    return (
        <>
            <Login>
                <LoginForm />
                <GithubLoginForm />
            </Login>
        </>
    );
};

const Login = styled.div`
    min-height: 100%;
    width: 100%;
    padding: 5%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    > form {
        min-width: 50%;
    }
`;
