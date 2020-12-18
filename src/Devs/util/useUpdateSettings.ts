import { firestore } from 'firebase';
import { useState } from 'react';
import { DevSchema } from '../devSchema';

export default function useUpdateSettings(dev: DevSchema) {
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');
    const [error, setError] = useState<string | undefined>(undefined);

    async function updateSettings(newSettings: DevSchema['settings']) {
        setStatus('loading');
        const devRef = firestore().collection('devs').doc(dev.user.uid);
        try {
            await devRef.update({
                settings: newSettings,
            });
        } catch (err) {
            console.error(err.message);
            setError(err.message);
            setStatus('error');
            return;
        }
        setStatus('success');
    }

    return { status, error, updateSettings };
}
