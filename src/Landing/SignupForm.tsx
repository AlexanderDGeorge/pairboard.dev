import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { StyledField } from '../styled-components/StyledField';
import {
    StyledButton,
    StyledButtonRow,
} from '../styled-components/StyledButtons';
import useSignup from './util/useSignup';
import LoadingBar from '../Components/Animated/LoadingBar';
import { validateUsername, validateEmail } from '../util/validationFunctions';

export default function SignupForm(props: { setTopError: Function }) {
    const { setTopError } = props;
    const { status, error, signupWithEmail } = useSignup();

    useEffect(() => {
        setTopError(error);
        // eslint-disable-next-line
    }, [error]);

    async function validate(values: {
        username: string;
        email: string;
        password: string;
    }) {
        const errors: { [key: string]: string } = {};

        validateUsername(values.username, '', errors);
        validateEmail(values.email, errors);

        if (!values.password) {
            errors.password = 'required';
        } else if (values.password.length < 8) {
            errors.password = 'password must be a least eight characters long';
        }

        return errors;
    }

    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                password: '',
            }}
            validate={validate}
            onSubmit={(values) =>
                signupWithEmail(values.username, values.email, values.password)
            }
        >
            {({ isValid }) => (
                <Form style={{ width: '100%' }}>
                    <StyledField>
                        <label htmlFor="username">username</label>
                        <Field type="text" name="username" />
                        <ErrorMessage name="username" component="p" />
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
                            style={{ width: '100%' }}
                            type="submit"
                            disabled={!isValid || status === 'loading'}
                        >
                            {status === 'loading' ? <LoadingBar /> : 'Sign Up'}
                        </StyledButton>
                    </StyledButtonRow>
                </Form>
            )}
        </Formik>
    );
}
