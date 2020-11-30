import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FaGithub } from 'react-icons/fa';
import styled from 'styled-components';
import { StyledField } from '../../styled-components/StyledField';
import { StyledGithubButton } from '../../styled-components/StyledButtons';
import { validateUsername } from '../../util/validationFunctions';
import { signupWithGithub } from '../../firebase/auth';

export default function ProviderSignup(props: {setTopError: Function}) {
    const [loading, setLoading] = useState(false);

    async function validate(values: { username: string }) {
        const errors: { [key: string]: string } = {};
        await validateUsername(values.username, '', errors);
        return errors;
    }

    async function handleSubmit(values: {username: string}) {
        setLoading(true);
        const result = await signupWithGithub(values.username);
        if (result) {
            props.setTopError('there was an error creating your account')
            setLoading(false);
        }
    }

    return (
        <Formik
            initialValues={{ username: '' }}
            validate={validate}
            onSubmit={handleSubmit}
        >
            {({ isValid }) => (
                <StyledProviderSignup>
                    <StyledField>
                        <label htmlFor="username">username</label>
                        <Field type="text" name="username" />
                        <ErrorMessage name="username" component="p"/>
                    </StyledField>
                    <StyledGithubButton type='submit' disabled={!isValid || loading}>
                        <FaGithub />
                    </StyledGithubButton>
                </StyledProviderSignup>
            )}
        </Formik>
    )
}

const StyledProviderSignup = styled(Form)`
    width: 100%;
    > span {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;