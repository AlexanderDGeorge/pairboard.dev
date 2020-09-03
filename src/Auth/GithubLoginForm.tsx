import React from "react";
import { StyledButton } from "../styled-components/formStyles";
import styled from "styled-components";
import { loginWithGithub } from "../firebase/auth";

export default () => {
    return (
        <StyledForm>
            <h1>Log In with Github</h1>
            <StyledButton onClick={loginWithGithub}>
                Log In with Github
            </StyledButton>
        </StyledForm>
    );
};

const StyledForm = styled.div`
    width: 50%;
    padding: 2%;
    display: flex;
    flex-direction: column;
    > button {
        margin: 20px 0;
    }
`;
