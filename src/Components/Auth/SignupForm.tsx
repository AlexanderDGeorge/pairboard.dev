import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { StyledField, StyledButton } from "../..//styled-components/formStyles";
import {
    signup,
    SignUpValues,
    checkForValidUsername,
    checkForValidEmail,
} from "../../firebase/auth";

export default () => {
    async function validate(values: SignUpValues) {
        const errors: { [key: string]: string } = {};
        if (!values.username) {
            errors.username = "required";
        } else if (values.username.length < 4) {
            errors.username = "username must be a least four characters";
        } else if (!(await checkForValidUsername(values.username))) {
            errors.username = "username already in use";
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
        } else if (!(await checkForValidEmail(values.email))) {
            // expensive
            errors.email = "email already in use";
        }

        if (!values.password) {
            errors.password = "required";
        } else if (values.password.length < 8) {
            errors.password = "password must be a least eight characters";
        }

        return errors;
    }

    function handleSubmit(values: SignUpValues) {
        signup(values);
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
            {({ isSubmitting }) => (
                <Form>
                    <h1>Sign Up</h1>
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
                    <StyledButton type="submit" disabled={isSubmitting}>
                        Sign Up
                    </StyledButton>
                </Form>
            )}
        </Formik>
    );
};
