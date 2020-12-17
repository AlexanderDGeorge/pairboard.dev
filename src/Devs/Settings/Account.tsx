import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { CurrentDevContext } from '../../Application';
import useUpdateAccount from '../util/useUpdateAccount';
import { StyledField } from '../../styled-components/StyledField';
import {
    StyledButton,
    StyledButtonRow,
    StyledCancelButton,
} from '../../styled-components/StyledButtons';
import { validateEmail } from '../../util/validationFunctions';
import LoadingBar from '../../Components/Animated/LoadingBar';
import { HeavyH1 } from '../../styled-components/StyledHeaders';

export default function Account() {
    const { user } = useContext(CurrentDevContext)!;
    const { status, error, updateEmail } = useUpdateAccount(user);

    async function validate(values: any) {
        const errors: { [key: string]: string } = {};
        validateEmail(values.email, errors);
        return errors;
    }

    return (
        <Formik
            initialValues={{ email: user.email }}
            onSubmit={(values) => updateEmail(values.email!)}
            validate={validate}
        >
            {({ isValid }) => (
                <AccountSettings>
                    <HeavyH1>Account</HeavyH1>
                    <StyledField>
                        <label htmlFor="email">email</label>
                        <Field name="email" type="email" />
                        <ErrorMessage name="email" component="p" />
                    </StyledField>
                    <StyledButtonRow>
                        <StyledCancelButton type="reset">
                            Cancel
                        </StyledCancelButton>
                        <StyledButton
                            type="submit"
                            disabled={!isValid || status === 'loading'}
                        >
                            {status === 'loading' ? (
                                <LoadingBar />
                            ) : (
                                'Update Account'
                            )}
                        </StyledButton>
                    </StyledButtonRow>
                </AccountSettings>
            )}
        </Formik>
    );
}

const AccountSettings = styled(Form)`
    height: 100%;
    width: 100%;
    padding: 10px;
`;
