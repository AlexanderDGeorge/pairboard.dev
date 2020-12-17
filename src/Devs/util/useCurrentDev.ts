import { auth, firestore } from '../../firebase';
import { firestore as Firestore } from 'firebase';
import { useEffect, useState } from 'react';
import { DevSchema } from '../devSchema';

export default function useCurrentDev() {
    const [dev, setDev] = useState<DevSchema | undefined | null>(undefined);

    useEffect(() => {
        let unsubscribe: Function | null = null;

        auth.onAuthStateChanged((user) => {
            if (!user) {
                setDev(null);
                return;
            }
            unsubscribe = firestore()
                .collection('devs')
                .doc(user.uid)
                .onSnapshot((snapshot) => {
                    const data = snapshot?.data();
                    if (!data) return;
                    setDev({
                        user,
                        ...convertDocToDev(data),
                    });
                });
        });

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    return dev;
}

const convertDocToDev = (doc: Firestore.DocumentData) => ({
    settings: doc.settings,
    joined_posts: doc.joined_posts,
    created_posts: doc.created_posts,
    username: doc.username,
    image_url: doc.image_url,
    connections: doc.connections,
    bio: doc.bio,
    name: doc.name,
    email: doc.email,
    location: doc.location,
    github_url: doc.github_url,
    linkedIn_url: doc.linkedIn_url,
    personal_url: doc.personal_url,
});
