import React from "react";
import styled from "styled-components";
import Header from "../Nav/Header";
import LoginForm from "../Auth/LoginForm";
import { handleAuth } from "../firebase/auth";
import Footer from "../Nav/Footer";

export default () => {
    return (
        <>
            <Header />
            <Login>
                <h1>Login</h1>
                <LoginForm />
                <h2>OR</h2>
                <button onClick={handleAuth}>Login with Github</button>
            </Login>
            <Footer />
        </>
    );
};

const Login = styled.div`
    height: 100%;
    width: 100%;
    padding: 5%;
    > button {
        width: 100%;
        margin-top: 20px;
        border: 1px solid ${(props) => props.theme.accent};
        padding: 2%;
        font-size: 1em;
        outline: none;
        cursor: pointer;
        transition: all 0.2s linear;
        &:hover {
            transition: all 0.5s linear;
            border: 1px solid transparent;
            color: ${(props) => props.theme.white};
            background-color: ${(props) => props.theme.verydark};
        }
    }
    > h2 {
        margin-top: 20px;
        width: 100%;
        color: ${(props) => props.theme.dark};
        font-weight: 500;
        font-size: 1.3em;
        text-align: center;
    }
`;
