import React from "react";
import styled from "styled-components";
import Header from "../Nav/Header";
import SignupForm from "../Auth/SignupForm";

export default () => {
    return (
        <>
            <Header />
            <Signup>
                <h1>Sign Up</h1>
                <SignupForm />
            </Signup>
        </>
    );
};

const Signup = styled.div`
    height: 100%;
    width: 100%;
    padding: 5%;
`;
