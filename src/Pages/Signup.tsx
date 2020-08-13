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
                <button>Sign up with Github</button>
            </Signup>
        </>
    );
};

const Signup = styled.div`
    height: 100%;
    width: 100%;
    padding: 5%;
    > button {
        width: 100%;
        border: 1px solid ${(props) => props.theme.accent};
        padding: 2%;
        font-size: 1em;
        outline: none;
    }
`;
