import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { StyledField, StyledButton } from "../../styled-components/formStyles";
import { checkForValidUsername, signupWithGithub } from "../../firebase/auth";

interface GithubSignUpValues {
    username: string;
    firstname: string;
    lastname: string;
}

export default (props: { setTopError: Function }) => {
    const { setTopError } = props;
    const [loading, setLoading] = useState(false);

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

    async function handleSubmit(values: GithubSignUpValues) {
        setLoading(true);
        const { username, firstname, lastname } = values;
        const result = await signupWithGithub(username, firstname, lastname);
        if (result) {
            setTopError("there was an error creating your account");
            setLoading(false);
        }
    }

    // [TODO]: look into FastField from Formik

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
            {({ isValid }) => (
                <Form>
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
                    <StyledButton type="submit" disabled={!isValid || loading}>
                        Sign Up with Github
                    </StyledButton>
                </Form>
            )}
        </Formik>
    );
};
