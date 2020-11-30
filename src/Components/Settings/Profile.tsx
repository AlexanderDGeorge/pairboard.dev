import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import { UserContext } from '../../Application';
import { StyledField } from '../../styled-components/StyledField';
import { StyledButton, StyledButtonRow, StyledCancelButton } from '../../styled-components/StyledButtons';
import { UserSchema } from '../../firebase/schema';
import {validateUsername} from '../../util/validationFunctions';
import LoadingBar from '../Animated/LoadingBar';
import { updateUserProfile } from '../../firebase/user';

interface ProfileValues {
    username: UserSchema['username'];
    blurb: UserSchema['blurb'];
    location: UserSchema['location'];
    personalURL: UserSchema['personalURL'];
    githubURL: UserSchema['githubURL'];
    linkedInURL: UserSchema['linkedInURL'] 
}

export default function Profile() {
    const {uid, username, blurb, location, personalURL, githubURL, linkedInURL} = useContext(UserContext)!;
    const [loading, setLoading] = useState(false);
    const [topMessage, setTopMessage] = useState('');

    async function validate(values: ProfileValues) {
        const errors: { [key: string]: string } = {};
        validateUsername(values.username, username, errors);

        if (values.blurb && values.blurb.length > 160) {
            errors.blurb = 'blurb is too long'
        }
        return errors;
    }

    async function handleSubmit(values: ProfileValues) {
        setLoading(true);
        await updateUserProfile(uid, values.blurb, values.githubURL, values.linkedInURL, values.personalURL, values.location, values.username.toLowerCase());
        setTopMessage('Successfully updated profile')
        setLoading(false);
    }

    return (
        <Formik
            initialValues={{ username, blurb: blurb || '', location: location || '', personalURL: personalURL || '', githubURL: githubURL || '', linkedInURL: linkedInURL || '' }}
            onSubmit={handleSubmit}
            validate={validate}
        >
            {({ isValid }) => (
                <ProfileSettings>
                    <h1>Profile</h1>
                    <h2>{topMessage}</h2>
                <StyledField>
                    <label htmlFor="username">username</label>
                    <Field name='username' type="text" />
                    <ErrorMessage name='username' component='p' />
                    <li>Usernames must be between 4 - 20 characters long.</li>
                    <li>Usernames must only contain numbers, letters, underscores, and periods. </li>
                </StyledField>
                <StyledField>
                    <label htmlFor="blurb">blurb</label>
                    <Field name='blurb' type="text" />
                    <ErrorMessage name='blurb' component='p' />
                    <li>Blurbs are optional but must be less than 160 characters long.</li>
                </StyledField>
                <StyledField>
                    <label htmlFor="location">location</label>
                    <Field name='location' type="text" />
                    <ErrorMessage name='location' component='p' />
                </StyledField>
                <StyledField>
                    <label htmlFor="personalURL">personalURL</label>
                    <Field type='url' name='personalURL' placeholder='exampleurl.com' />
                    <ErrorMessage name='personalURL' component='p' />
                </StyledField>
                <StyledField>
                    <label htmlFor="githubURL">githubURL</label>
                    <Field type='url' name='githubURL' placeholder='github.com/Username' />
                    <ErrorMessage name='githubURL' component='p' />
                </StyledField>
                <StyledField>
                    <label htmlFor="linkedInURL">linkedInURL</label>
                    <Field type='url' name='linkedInURL' placeholder='linkedIn.com/Username' />
                    <ErrorMessage name='linkedInURL' component='p' />
                </StyledField>
                    <StyledButtonRow>
                    <StyledCancelButton type='reset'>Cancel</StyledCancelButton>
                    <StyledButton type='submit' disabled={!isValid || loading}>
                        {loading ? <LoadingBar /> : 'Update Profile'}
                    </StyledButton>
                </StyledButtonRow>
            </ProfileSettings>
        )}
        </Formik>
    )
}

const ProfileSettings = styled(Form)`
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
