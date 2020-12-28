import { auth, firestore, functions } from '../../firebase';
import { firestore as Firestore } from 'firebase';
import { useEffect, useState } from 'react';
import { DevSchema } from '../devSchema';

// const addTokenToDev = functions.httpsCallable('addTokenToDev');

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

    // useEffect(() => {
    //     if (dev && !dev.token) {
    //         messaging
    //             .getToken({
    //                 vapidKey:
    //                     'BPJzud3LAYftqMJ1j9YRDC71Kk9RCcl6IQQA8DQ4LdEsnFxsD68e59nc4vctHa1y-DqBY_R7oXkYTn3wi9USBr0',
    //             })
    //             .then(async (token) => {
    //                 if (token) {
    //                     console.log('generated token', token);
    //                     await addTokenToDev({ token });
    //                 }
    //             });
    //     }
    // }, [dev]);

    return dev;
}

const convertDocToDev = (doc: Firestore.DocumentData) => ({
    settings: doc.settings,
    profile: doc.profile,
    token: doc.token,
    roomId: doc.roomId,
});
