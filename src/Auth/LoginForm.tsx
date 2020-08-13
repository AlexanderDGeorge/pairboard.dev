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
    }
    > input,
    button {
        margin: 10px 0 5% 0;
        border: 1px solid ${(props) => props.theme.accent};
        padding: 2%;
        font-size: 1em;
        outline: none;
    }
`;
