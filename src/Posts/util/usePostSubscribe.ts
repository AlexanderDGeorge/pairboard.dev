import { useContext, useState } from 'react';
import { CurrentDevContext } from '../../Application';
import { functions } from '../../firebase';
import { PostSchema } from '../postSchema';

const subscribeToPost = functions.httpsCallable('subscribeToPost');
const unsubscribeFromPost = functions.httpsCallable('unsubscribeFromPost');

export default function usePostSubscribe(post: PostSchema) {
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');
    const [error, setError] = useState<string | undefined>(undefined);
    const { profile, token } = useContext(CurrentDevContext)!;
    const [subscribed, setSubscribed] = useState(
        post.subscribers.includes(profile.uid),
    );

    console.log(token);

    async function toggleSubscription() {
        setError(undefined);
        setStatus('loading');

        if (!token) {
            setError('must allow notifications to subscribe');
            setStatus('error');
        } else {
            if (subscribed) {
                unsubscribeFromPost({ postId: post.id, token });
                setSubscribed(false);
            } else {
                subscribeToPost({ postId: post.id, token });
                setSubscribed(true);
            }
        }
    }

    return { status, error, subscribed, toggleSubscription };
}
