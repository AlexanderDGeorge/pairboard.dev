import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../Application';
import { UserSchema } from '../../firebase/schema';
import { updateUserAccount } from '../../firebase/user';
import { StyledField } from '../../styled-components/StyledField';
import { StyledButton, StyledButtonRow, StyledCancelButton } from '../../styled-components/StyledButtons';
import { validateEmail } from '../../util/validationFunctions';
import LoadingBar from '../Animated/LoadingBar';
import { HeavyH1 } from '../../styled-components/StyledHeaders';

interface AccountValues {
    email: UserSchema['email']
}

export default function Account() {
    const [loading, setLoading] = useState(false);
    const { uid, email } = useContext(UserContext)!;

    async function validate(values: AccountValues) {
        const errors: { [key: string]: string } = {};
        validateEmail(values.email, email, errors);
        return errors;
    }

    async function handleSubmit(values: AccountValues) {
        setLoading(true);
        await updateUserAccount(uid, values.email);
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
                    <HeavyH1>Account</HeavyH1>
                    <StyledField>
                        <label htmlFor="email">email</label>
                        <Field name='email' type='email' />
                        <ErrorMessage name='email' component='p'/>
                    </StyledField>
                    <StyledButtonRow>
                        <StyledCancelButton type='reset'>Cancel</StyledCancelButton>
                    <StyledButton type='submit' disabled={!isValid || loading}>
                        {loading ? <LoadingBar /> : 'Update Account'}
                    </StyledButton>
                    </StyledButtonRow>
                </AccountSettings>
        )}
        </Formik>
    )
}

const AccountSettings = styled(Form)`
    height: 100%;
    width: 100%;
    padding: 10px;
`;