import React from "react";
import styled from "styled-components";
import LoginForm from "../Components/Auth/LoginForm";
import GithubLoginForm from "../Components/Auth/GithubLoginForm";
import Footer from "../Components/Nav/Footer";
import Header from "../Components/Nav/Header";

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
    }
`;
