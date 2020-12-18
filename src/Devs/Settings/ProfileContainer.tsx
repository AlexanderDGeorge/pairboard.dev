import React, { useState, useContext, useEffect } from 'react';
import { CurrentDevContext } from '../../Application';
import { validateUsername } from '../../util/validationFunctions';
import Profile from './Profile';
import { DevPublicProfile } from '../devSchema';
import useUpdateProfile from '../util/useUpdateProfile';

export default function ProfileContainer() {
    const { profile } = useContext(CurrentDevContext)!;
    const [topMessage, setTopMessage] = useState<string | undefined>(undefined);
    const { status, error, updateProfile } = useUpdateProfile();

    useEffect(() => {
        setTopMessage(error);
    }, [error]);

    useEffect(() => {
        if (status === 'success') {
            setTopMessage('Profile updated!');
        }
    }, [status]);

    async function validate(values: DevPublicProfile) {
        const errors: { [key: string]: string } = {};
        validateUsername(values.username, profile.username, errors);

        if (values.bio && values.bio.length > 160) {
            errors.bio = 'bio is too long';
        }
        return errors;
    }

    async function handleSubmit(values: DevPublicProfile) {
        console.log(values);
        const { uid, connections, image_url } = profile;
        await updateProfile({ ...values, uid, connections, image_url });
    }

    return (
        <Profile
            dev={profile}
            loading={status === 'loading'}
            topMessage={topMessage}
            validate={validate}
            handleSubmit={handleSubmit}
        />
    );
}
