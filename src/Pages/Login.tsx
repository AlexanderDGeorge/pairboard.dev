import React from "react";
import styled from "styled-components";
import Header from "../Nav/Header";
import LoginForm from "../Auth/LoginForm";

export default () => {
    return (
        <>
            <Header />
            <Login>
                <h1>Login</h1>
                <LoginForm />
                <button>Login with Github</button>
            </Login>
        </>
    );
};

const Login = styled.div`
    height: 100%;
    width: 100%;
    padding: 5%;
    > button {
        width: 100%;
        border: 1px solid ${(props) => props.theme.accent};
        padding: 2%;
        font-size: 1em;
        outline: none;
    }
`;
