import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { StyledField, StyledButton } from "../..//styled-components/formStyles";
import { signup, SignUpValues } from "../../firebase/auth";
import styled from "styled-components";
import { MdError } from "react-icons/md";
import LoadingBar from "../Animated/LoadingBar";

export default function SignupForm(props: {
    topError?: string;
    setTopError: Function;
}) {
    const { topError, setTopError } = props;
    const [loading, setLoading] = useState(false);

    async function validate(values: SignUpValues) {
        setTopError(undefined);
        const errors: { [key: string]: string } = {};
        if (!values.username) {
            errors.username = "required";
        } else if (values.username.length < 4) {
            errors.username = "username must be a least four characters";
        }

        if (!values.firstname) {
            errors.firstname = "required";
        }

        if (!values.lastname) {
            errors.lastname = "required";
        }

        if (!values.email) {
            errors.email = "required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = "invalid email address";
        }

        if (!values.password) {
            errors.password = "required";
        } else if (values.password.length < 8) {
            errors.password = "password must be a least eight characters";
        }

        return errors;
    }

    async function handleSubmit(values: SignUpValues) {
        setLoading(true);
        const result = await signup(values);
        if (result) {
            setTopError("there was an error creating your account");
            setLoading(false);
        }
    }

    return (
        <Formik
            initialValues={{
                username: "",
                firstname: "",
                lastname: "",
                email: "",
                password: "",
            }}
            validateOnChange={false}
            validateOnBlur={true}
            validate={validate}
            onSubmit={handleSubmit}
        >
            {({ isValid }) => (
                <Form>
                    <TopError
                        style={topError ? { opacity: 1 } : { opacity: 0 }}
                    >
                        <MdError />
                        {topError}
                    </TopError>
                    <StyledField>
                        <label htmlFor="username">username</label>
                        <Field type="text" name="username" />
                        <ErrorMessage name="username" component="p" />
                    </StyledField>
                    <StyledField>
                        <label htmlFor="firstname">first name</label>
                        <Field type="text" name="firstname" />
                        <ErrorMessage name="firstname" component="p" />
                    </StyledField>
                    <StyledField>
                        <label htmlFor="lastname">last name</label>
                        <Field type="text" name="lastname" />
                        <ErrorMessage name="lastname" component="p" />
                    </StyledField>
                    <StyledField>
                        <label htmlFor="email">email</label>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="p" />
                    </StyledField>
                    <StyledField>
                        <label htmlFor="password">password</label>
                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="p" />
                    </StyledField>
                    <StyledButton type="submit" disabled={!isValid || loading}>
                        {loading ? <LoadingBar /> : "Sign Up"}
                    </StyledButton>
                </Form>
            )}
        </Formik>
    );
}

const TopError = styled.div`
    height: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.red};
    > svg {
        height: 100%;
        width: auto;
        margin-right: 10px;
        background: transparent;
        fill: ${(props) => props.theme.red};
    }
`;
