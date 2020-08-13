import React from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";

function loginUser(values: any) {
    console.log(values);
}

export default () => {
    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            onSubmit={(values) => {
                loginUser(values);
            }}
        >
            <LoginForm className="login-form">
                <label htmlFor="email">Email</label>
                <Field
                    name="email"
                    autoComplete="username email"
                    type="email"
                    placeholder="alex@email.com"
                />
                <label htmlFor="password">Password</label>
                <Field
                    name="password"
                    autoComplete="current-password"
                    type="password"
                    placeholder="super secret password"
                />
                <button type="submit">Login</button>
            </LoginForm>
        </Formik>
    );
};

const LoginForm = styled(Form)`
    min-height: 50%;
    min-width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    > label {
        font-size: 1em;
        margin-top: 20px;
    }
    > input {
        margin-top: 5px;
        border: 1px solid ${(props) => props.theme.accent};
        padding: 2%;
        font-size: 1em;
        outline: none;
    }
    > button {
        margin-top: 20px;
        border: 1px solid ${(props) => props.theme.accent};
        padding: 2%;
        font-size: 1em;
        outline: none;
        cursor: pointer;
        transition: all 0.2s linear;
        &:hover {
            transition: all 0.5s linear;
            border: 1px solid transparent;
            color: ${(props) => props.theme.white};
            background-color: ${(props) => props.theme.verydark};
        }
    }
`;
