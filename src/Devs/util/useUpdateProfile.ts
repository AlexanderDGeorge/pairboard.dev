import { firestore } from '../../firebase';
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
                    ...profile,
                });
        } catch (err) {
            console.error(err.message);
            setError(err.message);
            setStatus('error');
            return;
        }
        setStatus('success');
    }

    return { status, error, updateProfile };
}
