import { firestore, storage } from '../../firebase';
import { useState } from 'react';
import { DevPublicProfile } from '../devSchema';

export default function useUpdateProfile() {
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');
    const [error, setError] = useState<string | undefined>(undefined);

    async function updateProfile(profile: DevPublicProfile) {
        setError(undefined);
        setStatus('loading');
        try {
            await firestore()
                .collection('devs')
                .doc(profile.uid)
                .update({
                    profile: { ...profile },
                });
        } catch (err) {
            console.error(err.message);
            setError(err.message);
            setStatus('error');
            return;
        }
        setStatus('success');
    }

    async function uploadImage(file: string | File, profile: DevPublicProfile) {
        const savedFile = file;
        setError(undefined);
        setStatus('loading');

        console.log(savedFile);

        if (savedFile === profile.image_url) return;

        if (typeof savedFile === 'string') {
            return updateProfile({ ...profile, image_url: savedFile });
        } else {
            try {
                const image_url = await storage
                    .ref()
                    .child(`image_urls/${profile.uid}`)
                    .put(savedFile)
                    .then((snapshot) => {
                        snapshot.ref.getDownloadURL();
                    });
                const newProfile = Object.assign(profile, { image_url });
                return updateProfile(newProfile);
            } catch (err) {
                console.error(err.message);
                setError(err.message);
                setStatus('error');
            }
        }

        setStatus('success');
    }

    return { status, error, updateProfile, uploadImage };
}
