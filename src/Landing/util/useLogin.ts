import { useContext, useState } from 'react';
import { ModalContext } from '../../Application';
import { auth, githubProvider } from '../../firebase';

export default function useLogin() {
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');
    const [error, setError] = useState<string | undefined>(undefined);
    const { handleModal } = useContext(ModalContext)!;

    async function loginWithEmail(email: string, password: string) {
        setError(undefined);
        setStatus('loading');
        try {
            await auth.signInWithEmailAndPassword(email, password);
            setStatus('success');
            handleModal();
        } catch (err) {
            console.error(err.message);
            setError(err.message);
            setStatus('error');
        }
    }

    async function loginWithGithub() {
        setError(undefined);
        setStatus('loading');
        try {
            await auth.signInWithPopup(githubProvider);
            setStatus('success');
            handleModal();
        } catch (err) {
            console.error(err.message);
            setError(err.message);
            setStatus('error');
        }
    }

    return { status, error, loginWithEmail, loginWithGithub };
}
