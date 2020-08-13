import React from "react";
import styled from "styled-components";
import Header from "../Nav/Header";
import SignupForm from "../Auth/SignupForm";
import Footer from "../Nav/Footer";

export default () => {
    return (
        <>
            <Header />
            <Signup>
                <h1>Sign Up</h1>
                <SignupForm />
            </Signup>
            <Footer />
        </>
    );
};

const Signup = styled.div`
    height: 100%;
    width: 100%;
    padding: 5%;
    > h1 {
        background-color: transparent;
    }
`;
