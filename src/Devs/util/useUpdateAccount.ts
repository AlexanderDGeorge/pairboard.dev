import { useState } from 'react';
import { DevSchema } from '../devSchema';

export default function useUpdateAccount(user: DevSchema['user']) {
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');
    const [error, setError] = useState<string | undefined>(undefined);

    async function updateEmail(newEmail: string) {
        setStatus('loading');
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newEmail)) {
            // regex to check valid email
            try {
                await user.updateEmail(newEmail);
            } catch (err) {
                console.error(err.message);
                setError(err.message);
                setStatus('error');
                return;
            }
        } else {
            setError('invalid email address');
            setStatus('error');
            return;
        }
        setStatus('success');
    }

    return { status, error, updateEmail };
}
