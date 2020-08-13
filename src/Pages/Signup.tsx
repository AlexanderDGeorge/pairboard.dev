import React from "react";
import styled from "styled-components";
import Header from "../Nav/Header";

export default () => {
    return (
        <Signup>
            <Header />
            <SignupForm></SignupForm>
        </Signup>
    );
};

const Signup = styled.div`
    height: 100%;
    width: 100%;
`;

const SignupForm = styled.form`
    display: flex;
`;
