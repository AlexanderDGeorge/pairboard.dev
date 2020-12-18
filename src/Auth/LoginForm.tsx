import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { StyledField } from '../styled-components/StyledField';
import {
    StyledButton,
    StyledButtonRow,
} from '../styled-components/StyledButtons';
import styled from 'styled-components';
import { MdError } from 'react-icons/md';
import LoadingBar from '../Components/Animated/LoadingBar';
import useLogin from './util/useLogin';

export default function LoginForm() {
    const [topError, setTopError] = useState<string | undefined>(undefined);
    const { loginWithEmail, status, error } = useLogin();

    useEffect(() => {
        setTopError(error);
    }, [error]);

    function validate(values: { email: string; password: string }) {
        const errors: { [key: string]: string } = {};

        if (!values.email) {
            errors.email = 'required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'invalid email address';
        }
        if (!values.password) {
            errors.password = 'required';
        }
        return errors;
    }

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validate={validate}
            onSubmit={(values) => loginWithEmail(values.email, values.password)}
        >
            {({ isValid }) => (
                <Form>
                    {topError ? (
                        <TopError>
                            <MdError /> {topError}{' '}
                        </TopError>
                    ) : null}
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
                            disabled={!isValid || status === 'loading'}
                            type="submit"
                        >
                            {status === 'loading' ? <LoadingBar /> : 'log in'}
                        </StyledButton>
                    </StyledButtonRow>
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
