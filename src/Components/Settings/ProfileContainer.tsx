import React, { useState, useContext } from 'react';
import { UserContext } from '../../Application';
import { UserSchema } from '../../firebase/schema';
import { validateUsername } from '../../util/validationFunctions';
import { updateUserProfile } from '../../firebase/user';
import Profile from './Profile';

interface ProfileValues {
    photoURL: UserSchema['photoURL'];
    username: UserSchema['username'];
    name: UserSchema['name'];
    blurb: UserSchema['blurb'];
    location: UserSchema['location'];
    personalURL: UserSchema['personalURL'];
    githubURL: UserSchema['githubURL'];
    linkedInURL: UserSchema['linkedInURL'] 
}

export default function ProfileContainer() {
    const user = useContext(UserContext)!;
    const [loading, setLoading] = useState(false);
    const [topMessage, setTopMessage] = useState('');

    async function validate(values: ProfileValues) {
        const errors: { [key: string]: string } = {};
        validateUsername(values.username, user.username, errors);

        if (values.blurb && values.blurb.length > 160) {
            errors.blurb = 'blurb is too long'
        }
        return errors;
    }

    async function handleSubmit(values: ProfileValues) {
        setLoading(true);
        await updateUserProfile(
            user.uid, values.photoURL, values.blurb, values.githubURL, values.linkedInURL,
            values.personalURL, values.location, values.username.toLowerCase()
        );
        setTopMessage('Successfully updated profile')
        setLoading(false);
    }

    return (
        <Profile
            user={user}
            loading={loading}
            topMessage={topMessage}
            validate={validate}
            handleSubmit={handleSubmit}
        />
    )
}