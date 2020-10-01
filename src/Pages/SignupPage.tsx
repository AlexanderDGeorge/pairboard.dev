import React from "react";
import styled from "styled-components";
import SignupForm from "../Auth/SignupForm";
import GithubSignupForm from "../Auth/GithubSignupForm";
import Header from "../Components/Nav/Header";
import Footer from "../Components/Nav/Footer";

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
    }
`;
