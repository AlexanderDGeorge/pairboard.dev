import React from "react";
import styled from "styled-components";
import Header from "../Nav/Header";
import LoginForm from "../Auth/LoginForm";
import Footer from "../Nav/Footer";

export default () => {
    return (
        <>
            <Header />
            <Login>
                <h1>Login</h1>
                <LoginForm />
            </Login>
            <Footer />
        </>
    );
};

const Login = styled.div`
    height: 100%;
    width: 100%;
    padding: 5%;
`;
