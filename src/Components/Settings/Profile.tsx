import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import { StyledField } from '../../styled-components/StyledField';
import { StyledButton, StyledButtonRow, StyledCancelButton } from '../../styled-components/StyledButtons';
import { UserSchema } from '../../firebase/schema';
import LoadingBar from '../Animated/LoadingBar';
import ProfilePicture from './ProfilePicture';


export default function Profile(props: {
    loading: boolean,
    topMessage: string,
    setImageFile: Function,
    validate: any,
    handleSubmit: any
    user: UserSchema
}) {
    const {
        username, name, blurb, location,
        personalURL, githubURL, linkedInURL
    } = props.user;
    const { loading, topMessage, validate, handleSubmit, setImageFile } = props;

    return (
        <Formik
            initialValues={{
                username,
                name: name || '',
                blurb: blurb || '',
                location: location || '',
                personalURL: personalURL || '',
                githubURL: githubURL || '',
                linkedInURL: linkedInURL || ''
            }}
            onSubmit={handleSubmit}
            validate={validate}
        >
            {({ isValid }) => (
                <ProfileSettings>
                    <h1>Profile</h1>
                    <h2>{topMessage}</h2>
                <ProfilePicture setImageFile={setImageFile} />
                <StyledField>
                    <label htmlFor="username">username</label>
                    <Field name='username' type="text" />
                    <ErrorMessage name='username' component='p' />
                    <li>Usernames must be between 4 - 20 characters long.</li>
                    <li>Usernames must only contain numbers, letters, underscores, and periods. </li>
                </StyledField>
                <StyledField>
                    <label htmlFor="name">name</label>
                    <Field name='name' type="text" />
                    <ErrorMessage name='name' component='p' />
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
    overflow-y: scroll;
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
