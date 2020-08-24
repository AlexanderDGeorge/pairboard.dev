import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { StyledField, StyledButton } from "../styled-components/formStyles";
import { checkForValidUsername, signupWithGithub } from "../firebase/auth";

interface GithubSignUpValues {
    username: string;
    firstname: string;
    lastname: string;
}

export default () => {
    async function validate(values: GithubSignUpValues) {
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
        return errors;
    }

    function handleSubmit(values: GithubSignUpValues) {
        const { username, firstname, lastname } = values;
        signupWithGithub(username, firstname, lastname);
    }

    return (
        <Formik
            initialValues={{
                username: "",
                firstname: "",
                lastname: "",
            }}
            validateOnChange={false}
            validateOnBlur={true}
            validate={validate}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <h1>Sign Up with Github</h1>
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
                    <StyledButton type="submit" disabled={isSubmitting}>
                        Sign Up with Github
                    </StyledButton>
                </Form>
            )}
        </Formik>
    );
};
