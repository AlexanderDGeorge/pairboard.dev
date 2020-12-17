import React, { useState, useContext } from 'react';
import { CurrentDevContext } from '../../Application';
import { validateUsername } from '../../util/validationFunctions';
import Profile from './Profile';
import { DevPublicProfile } from '../devSchema';
import useUpdateProfile from '../util/useUpdateProfile';

export default function ProfileContainer() {
    const { profile } = useContext(CurrentDevContext)!;
    const [imageFile, setImageFile] = useState<File | string | undefined>(
        undefined,
    );
    const [loading, setLoading] = useState(false);
    const [topMessage, setTopMessage] = useState('');
    const { status, error, updateProfile } = useUpdateProfile();

    async function validate(values: DevPublicProfile) {
        const errors: { [key: string]: string } = {};
        validateUsername(values.username, profile.username, errors);

        if (values.bio && values.bio.length > 160) {
            errors.bio = 'bio is too long';
        }
        return errors;
    }

    async function handleSubmit(values: DevPublicProfile) {
        const {
            bio,
            github_url,
            linkedIn_url,
            personal_url,
            location,
            username,
        } = values;

        let imageURL;
        setLoading(true);

        if (typeof imageFile === 'string') {
            imageURL = imageFile;
        } else if (imageFile) {
            // imageURL = await uploadPhoto(imageFile, dev.user.uid);
        } else {
            imageURL = profile.image_url;
        }

        // await updateUserProfile({
        //     uid: dev.user.uid,
        //     image_url: imageURL,
        //     bio,
        //     github_url,
        //     linkedIn_url,
        //     personal_url,
        //     location,
        //     username: username.toLowerCase(),
        // });

        setTopMessage('Successfully updated profile');
        setLoading(false);
    }

    return (
        <Profile
            dev={profile}
            loading={loading}
            topMessage={topMessage}
            setImageFile={setImageFile}
            validate={validate}
            handleSubmit={handleSubmit}
        />
    );
}
