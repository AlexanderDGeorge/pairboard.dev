import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { StyledField, StyledButton } from "../styled-components/formStyles";
import { login } from "../firebase/auth";

interface LogInValues {
    email: string;
    password: string;
}

export default () => {
    function validate(values: LogInValues) {
        const errors: { [key: string]: string } = {};
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

    async function handleSubmit(values: LogInValues) {
        await login(values.email, values.password);
    }

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validate={validate}
            onSubmit={handleSubmit}
        >
            <Form>
                <h1>Log In</h1>
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
                <StyledButton type="submit">Log In</StyledButton>
            </Form>
        </Formik>
    );
};
