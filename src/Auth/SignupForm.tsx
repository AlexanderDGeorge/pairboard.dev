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
                username: "",
                name: "",
                email: "",
                experience: "",
                password: "",
            }}
            onSubmit={(values) => {
                loginUser(values);
            }}
        >
            <SignupForm className="login-form">
                <label htmlFor="username">Username</label>
                <Field
                    name="username"
                    type="text"
                    placeholder="Hackman"
                    autoFocus
                />
                <label htmlFor="name">Name</label>
                <Field name="name" type="text" placeholder="Alexander George" />
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" placeholder="alex@email.com" />
                <label htmlFor="password">Password</label>
                <Field
                    name="password"
                    type="password"
                    placeholder="super secret password"
                />
                <button type="submit">Sign Up</button>
                <button>Sign Up with Github</button>
            </SignupForm>
        </Formik>
    );
};

const SignupForm = styled(Form)`
    min-height: 50%;
    min-width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: transparent;
    > label {
        font-size: 1em;
        margin-top: 20px;
        background-color: transparent;
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
