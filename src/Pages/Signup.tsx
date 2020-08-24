import React from "react";
import styled from "styled-components";
import Header from "../Nav/Header";
import SignupForm from "../Auth/SignupForm";
import GithubSignupForm from "../Auth/GithubSignupForm";
import Footer from "../Nav/Footer";

export default () => {
    return (
        <>
            <Header />
            <Signup>
                <SignupForm />
                <GithubSignupForm />
            </Signup>
            <Footer />
        </>
    );
};

const Signup = styled.div`
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
