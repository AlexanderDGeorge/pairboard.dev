import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { StyledField } from "../../styled-components/formStyles";
import { StyledButton, StyledButtonRow } from '../../styled-components/StyledButtons';
import { signupWithGithub } from "../../firebase/auth";
import {validateUsername} from "../../util/validationFunctions";

interface GithubSignUpValues {
    username: string;
    name: string;
}

export default function GithubSignupForm(props: { setTopError: Function }) {
    const { setTopError } = props;
    const [loading, setLoading] = useState(false);

    async function validate(values: GithubSignUpValues) {
        const errors: { [key: string]: string } = {};
        validateUsername(values.username, '', errors);

        if (!values.name) {
            errors.name = "required";
        }

        return errors;
    }

    async function handleSubmit(values: GithubSignUpValues) {
        setLoading(true);
        const { username, name } = values;
        const result = await signupWithGithub(username, name);
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
                name: "",
            }}
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
                        <label htmlFor="name">name</label>
                        <Field type="text" name="name" />
                        <ErrorMessage name="name" component="p" />
                    </StyledField>
                    <StyledButtonRow>
                    <StyledButton type="submit" disabled={!isValid || loading}>
                        Sign Up with Github
                    </StyledButton>

                    </StyledButtonRow>
                </Form>
            )}
        </Formik>
    );
}
