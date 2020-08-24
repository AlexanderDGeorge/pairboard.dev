import React from "react";
import styled from "styled-components";
import Input from "../Form/Input";

export default () => {
    function check() {}

    return (
        <LoginForm>
            <Input label="email" error="super error" checkForErrors={check} />
        </LoginForm>
    );
};

const LoginForm = styled.form`
    min-height: 50%;
    min-width: 50%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    > input {
        width: 50%;
    }
`;
