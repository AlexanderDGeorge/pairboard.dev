import React, { useState, useContext } from 'react';
import { UserContext } from '../../Application';
import { UserSchema } from '../../firebase/schema';
import { validateUsername } from '../../util/validationFunctions';
import { updateUserProfile, uploadPhoto } from '../../firebase/user';
import Profile from './Profile';

interface ProfileValues {
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
    const [imageFile, setImageFile] = useState<File | string | undefined>(undefined);
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
        const {
            blurb,
            githubURL,
            linkedInURL,
            personalURL,
            location,
            username
        } = values;

        let imageURL;
        setLoading(true);

        if (typeof imageFile === 'string') {
            imageURL = imageFile
        } else if (imageFile) {
            imageURL = await uploadPhoto(imageFile, user.uid);
        } else {
            imageURL = user.photoURL;
        }

        await updateUserProfile(
            user.uid,
            imageURL,
            blurb,
            githubURL,
            linkedInURL,
            personalURL,
            location,
            username.toLowerCase()
        )
        
        setTopMessage('Successfully updated profile')
        setLoading(false);
    }

    return (
        <Profile
            user={user}
            loading={loading}
            topMessage={topMessage}
            setImageFile={setImageFile}
            validate={validate}
            handleSubmit={handleSubmit}
        />
    )
}