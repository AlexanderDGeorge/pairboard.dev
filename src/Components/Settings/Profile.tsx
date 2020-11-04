import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import { UserContext } from '../../Application';
import { StyledField } from '../../styled-components/formStyles';
import { StyledButton } from '../../styled-components/StyledButtons';
import { UserSchema } from '../../firebase/schema';

interface ProfileValues {
    username: UserSchema['username'];
    blurb: UserSchema['blurb'];
    personalURL: UserSchema['personalURL'];
    githubURL: UserSchema['githubURL'];
    linkedInURL: UserSchema['linkedInURL'] 
}

export default function Profile() {
    const user = useContext(UserContext)!;
    const [username, setUsername] = useState(user.username);
    const [blurb, setBlurb] = useState(user.blurb || '');
    const [personalURL, setPersonalURL] = useState(user.personalURL || '');
    const [githubURL, setGithubURL] = useState(user.githubURL || '');
    const [linkedInURL, setLinkedInURL] = useState(user.linkedInURL || '');

    async function validate(values: ProfileValues) {
        console.log(values)
        const errors: { [key: string]: string } = {};
        if (!values.username) {
            errors.username = 'required';
        } else if (!values.username.match(/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)) {
            console.log('regex failed')
        }
    }

    async function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.replace(/\s+/g, '');
        setUsername(value.toLowerCase());
    }

    async function handleSubmit() {

    }

    return (
        <Formik
            initialValues={{ username, blurb, personalURL, githubURL, linkedInURL }}
            onSubmit={handleSubmit}
            validate={validate}
            validateOnBlur={true}
            validateOnChange={false}
        >
            {({ isValid }) => (
                <ProfileSettings>
                    <h1>Profile</h1>
                <StyledField>
                    <label htmlFor="username">username</label>
                    <Field name='username' type="text" />
                    <ErrorMessage name='username' component='p' />
                </StyledField>
                <StyledField>
                    <label htmlFor="blurb">blurb</label>
                    <input type="text" value={blurb} onChange={e => setBlurb(e.target.value)}/>
                </StyledField>
                <StyledField>
                    <label htmlFor="blurb">personalURL</label>
                    <input type='url' value={personalURL} placeholder='exampleurl.com' onChange={e => setPersonalURL(e.target.value)}/>
                </StyledField>
                <StyledField>
                    <label htmlFor="githubURL">githubURL</label>
                    <input type="url" value={githubURL} onChange={e => setGithubURL(e.target.value)}/>
                </StyledField>
                <StyledField>
                    <label htmlFor="linkedInURL">linkedInURL</label>
                    <input type="url" value={linkedInURL} onChange={e => setLinkedInURL(e.target.value)}/>
                </StyledField>
                <StyledButton type='submit'>
                    Update Changes
                </StyledButton>
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
