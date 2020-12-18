import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import { StyledField } from '../../styled-components/StyledField';
import {
    StyledButton,
    StyledButtonRow,
    StyledCancelButton,
} from '../../styled-components/StyledButtons';
import LoadingBar from '../../Components/Animated/LoadingBar';
import ProfilePicture from './ProfilePicture';
import { HeavyH1 } from '../../styled-components/StyledHeadings';
import { DevPublicProfile } from '../devSchema';

export default function Profile(props: {
    loading: boolean;
    topMessage: string;
    setImageFile: Function;
    validate: any;
    handleSubmit: any;
    dev: any;
}) {
    const {
        username,
        name,
        bio,
        location,
        personal_url,
        github_url,
        linkedIn_url,
    } = props.dev;
    const { loading, topMessage, validate, handleSubmit, setImageFile } = props;

    return (
        <Formik
            initialValues={{
                username,
                name: name || '',
                bio: bio || '',
                location: location || '',
                personal_url: personal_url || '',
                github_url: github_url || '',
                linkedIn_url: linkedIn_url || '',
            }}
            onSubmit={handleSubmit}
            validate={validate}
        >
            {({ isValid }) => (
                <ProfileSettings>
                    <HeavyH1>Profile</HeavyH1>
                    <h2>{topMessage}</h2>
                    <ProfilePicture setImageFile={setImageFile} />
                    <StyledField>
                        <label htmlFor="username">username</label>
                        <Field name="username" type="text" />
                        <ErrorMessage name="username" component="p" />
                        <li>
                            Usernames must be between 4 - 20 characters long.
                        </li>
                        <li>
                            Usernames must only contain numbers, letters,
                            underscores, and periods.{' '}
                        </li>
                    </StyledField>
                    <StyledField>
                        <label htmlFor="name">name</label>
                        <Field name="name" type="text" />
                        <ErrorMessage name="name" component="p" />
                    </StyledField>
                    <StyledField>
                        <label htmlFor="bio">bio</label>
                        <Field
                            name="bio"
                            type="text"
                            placeholder="Sample bio!"
                        />
                        <ErrorMessage name="bio" component="p" />
                        <li>
                            bios are optional but must be less than 160
                            characters long.
                        </li>
                    </StyledField>
                    <StyledField>
                        <label htmlFor="location">location</label>
                        <Field
                            name="location"
                            type="text"
                            placeholder="Seattle, WA"
                        />
                        <ErrorMessage name="location" component="p" />
                    </StyledField>
                    <StyledField>
                        <label htmlFor="personal_url">personal_url</label>
                        <Field
                            type="url"
                            name="personal_url"
                            placeholder="exampleurl.com"
                        />
                        <ErrorMessage name="personal_url" component="p" />
                    </StyledField>
                    <StyledField>
                        <label htmlFor="github_url">github_url</label>
                        <Field
                            type="url"
                            name="github_url"
                            placeholder="github.com/Username"
                        />
                        <ErrorMessage name="github_url" component="p" />
                    </StyledField>
                    <StyledField>
                        <label htmlFor="linkedIn_url">linkedIn_url</label>
                        <Field
                            type="url"
                            name="linkedIn_url"
                            placeholder="linkedIn.com/Username"
                        />
                        <ErrorMessage name="linkedIn_url" component="p" />
                    </StyledField>
                    <StyledButtonRow>
                        <StyledCancelButton type="reset">
                            Cancel
                        </StyledCancelButton>
                        <StyledButton
                            type="submit"
                            disabled={!isValid || loading}
                        >
                            {loading ? <LoadingBar /> : 'Update Profile'}
                        </StyledButton>
                    </StyledButtonRow>
                </ProfileSettings>
            )}
        </Formik>
    );
}

const ProfileSettings = styled(Form)`
    height: 100%;
    width: 100%;
    padding: 10px;
    overflow-y: auto;
`;
