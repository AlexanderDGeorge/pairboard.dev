import React, { useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FaGithub } from 'react-icons/fa';
import styled from 'styled-components';
import { StyledField } from '../styled-components/StyledField';
import { StyledGithubButton } from '../styled-components/StyledButtons';
import { validateUsername } from '../util/validationFunctions';
import useSignup from './util/useSignup';

export default function ProviderSignup(props: { setTopError: Function }) {
    const { setTopError } = props;
    const { status, error, signupWithGithub } = useSignup();

    useEffect(() => {
        setTopError(error);
        // eslint-disable-next-line
    }, [error]);

    async function validate(values: { username: string }) {
        const errors: { [key: string]: string } = {};
        await validateUsername(values.username, '', errors);
        return errors;
    }

    return (
        <Formik
            initialValues={{ username: '' }}
            validate={validate}
            onSubmit={(values) => signupWithGithub(values.username)}
        >
            {({ isValid }) => (
                <StyledProviderSignup>
                    <StyledField>
                        <label htmlFor="username">username</label>
                        <Field type="text" name="username" />
                        <ErrorMessage name="username" component="p" />
                    </StyledField>
                    <StyledGithubButton
                        type="submit"
                        disabled={!isValid || status === 'loading'}
                    >
                        <FaGithub />
                    </StyledGithubButton>
                </StyledProviderSignup>
            )}
        </Formik>
    );
}

const StyledProviderSignup = styled(Form)`
    width: 100%;
    > span {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;
