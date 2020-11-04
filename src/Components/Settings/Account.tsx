import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../Application';
import { UserSchema } from '../../firebase/schema';
import { updateUserAccount } from '../../firebase/user';
import { StyledField } from '../../styled-components/formStyles';
import { StyledButton } from '../../styled-components/StyledButtons';
import { validateEmail } from '../../util/validationFunctions';
import LoadingBar from '../Animated/LoadingBar';

interface AccountValues {
    email: UserSchema['email']
}

export default function Account() {
    const [loading, setLoading] = useState(false);
    const { email } = useContext(UserContext)!;

    async function validate(values: AccountValues) {
        const errors: { [key: string]: string } = {};
        validateEmail(values.email, email, errors);
        return errors;
    }

    async function handleSubmit(values: AccountValues) {
        setLoading(true);
        await updateUserAccount();
        setLoading(false);
    }

    return (
        <Formik
            initialValues={{email}}
            onSubmit={handleSubmit}
            validate={validate}
        >
            {({ isValid }) => (
                <AccountSettings>
                    <h1>Account</h1>
                    <StyledField>
                        <label htmlFor="email">email</label>
                        <Field name='email' type='email' />
                        <ErrorMessage name='email' component='p'/>
                    </StyledField>
                    <StyledButton type='submit' disabled={!isValid || loading}>
                        {loading ? <LoadingBar /> : 'Update Account'}
                    </StyledButton>
                </AccountSettings>
        )}
        </Formik>
    )
}

const AccountSettings = styled(Form)`
    height: 100%;
    width: 100%;
    padding: 10px;
    > h1 {
        margin-bottom: 10px;
        font-weight: 800;
        font-size: 3em;
        background: ${(props) =>
            `linear-gradient(140deg, ${props.theme.blue}, 20%, ${props.theme.green})`};
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
    }
`;