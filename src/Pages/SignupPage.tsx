import React from "react";
import styled from "styled-components";
import SignupForm from "../Components/Auth/SignupForm";
import GithubSignupForm from "../Components/Auth/GithubSignupForm";

export default () => {
    return (
        <>
            <Signup>
                <SignupForm />
                <GithubSignupForm />
            </Signup>
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
