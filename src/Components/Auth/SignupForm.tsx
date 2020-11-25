import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { StyledField } from "../..//styled-components/formStyles";
import { StyledButton, StyledButtonRow } from '../../styled-components/StyledButtons';
import { signup, SignUpValues } from "../../firebase/auth";
import LoadingBar from "../Animated/LoadingBar";
import { validateUsername, validateEmail } from "../../util/validationFunctions";

export default function SignupForm(props: {
    setTopError: Function;
}) {
    const { setTopError } = props;
    const [loading, setLoading] = useState(false);

    async function validate(values: SignUpValues) {
        setTopError(undefined);
        const errors: { [key: string]: string } = {};
        validateUsername(values.username, '', errors);

        if (!values.name) {
            errors.name = "required";
        }

        validateEmail(values.email, '', errors);

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
                name: "",
                email: "",
                password: "",
            }}
            validate={validate}
            onSubmit={handleSubmit}
        >
            {({ isValid }) => (
                <Form style={{width: '100%'}}> 
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
                    <StyledButtonRow>
                    <StyledButton
                        style={{width: '100%'}}
                        type="submit"
                        disabled={!isValid || loading}
                    >
                    {loading ? <LoadingBar /> : "Sign Up"}
                    </StyledButton>
                    </StyledButtonRow>
                </Form>
            )}
        </Formik>
    );
}

