import React from "react";
import styled from "styled-components";
import Header from "../Nav/Header";
import LoginForm from "../Auth/LoginForm";
import GithubLoginForm from "../Auth/GithubLoginForm";
import Footer from "../Nav/Footer";

export default () => {
    return (
        <>
            <Header />
            <Login>
                <LoginForm />
                <GithubLoginForm />
            </Login>
            <Footer />
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
        padding: 2%;
    }
`;
