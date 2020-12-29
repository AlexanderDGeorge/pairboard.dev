import { useState } from 'react';
import { DevPublicProfile, DevSchema, DevSettings } from '../../Devs/devSchema';
import { auth, firestore, githubProvider } from '../../firebase';
import { isUsernameAvailable } from '../../util/validationFunctions';

export default function useSignup() {
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');
    const [error, setError] = useState<string | undefined>(undefined);

    const defaultSettings: DevSettings = {
        dark_mode: 'auto',
        public_email: false,
        public_name: false,
        public_links: true,
    };

    async function createDevDocument(
        user: DevSchema['user'],
        username: DevPublicProfile['username'],
    ) {
        const devRef = firestore().collection('devs').doc(user.uid);
        try {
            await devRef.set({
                settings: defaultSettings,
                profile: {
                    username,
                    image_url:
                        user.providerData[0]?.photoURL ||
                        'https://firebasestorage.googleapis.com/v0/b/pairboarddev.appspot.com/o/photoURLs%2Fpairboard%20-%20B2.jpg?alt=media&token=8c860a24-bb83-47ff-a949-c071a09c9be4',
                    connections: [],
                    name: user.providerData[0]?.displayName || '',
                },
            });
        } catch (err) {
            console.error(err.message);
            setError(err.message);
            setStatus('error');
        }
    }

    async function signupWithGithub(username: DevPublicProfile['username']) {
        setError(undefined);
        setStatus('loading');
        if (!isUsernameAvailable(username)) {
            setError('username already in use');
            setStatus('error');
            return;
        }
        try {
            const { user } = await auth.signInWithPopup(githubProvider);
            if (user) {
                await createDevDocument(user, username);
            } else {
                setError('there was an error creating your account');
                setStatus('error');
                return;
            }
        } catch (err) {
            console.error(err.message);
            setError(err.message);
            setStatus('error');
            return;
        }
        setStatus('success');
    }

    async function signupWithEmail(
        username: DevPublicProfile['username'],
        email: string,
        password: string,
    ) {
        setError(undefined);
        setStatus('loading');
        if (!isUsernameAvailable(username)) {
            setError('username already in use');
            setStatus('error');
            return;
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password,
            );
            if (user) {
                await createDevDocument(user, username);
            } else {
                setError('there was an error creating your account');
                setStatus('error');
                return;
            }
        } catch (err) {
            console.error(err.message);
            setError(err.message);
            setStatus('error');
            return;
        }
        setStatus('success');
    }

    return { status, error, signupWithGithub, signupWithEmail };
}
