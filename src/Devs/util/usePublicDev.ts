import { useEffect, useState } from 'react';
import { DevPublicProfile, DevSchema } from '../devSchema';
import useFirebaseQuery from '../../util/useFirebaseQuery';
import { firestore, fieldValue } from '../../firebase';

export default function usePublicDev(username: DevPublicProfile['username']) {
    const { status, data } = useFirebaseQuery(
        firestore().collection('devs').where('username', '==', username),
    );
    const [publicDev, setPublicDev] = useState<
        DevPublicProfile | undefined | null
    >(undefined);

    useEffect(() => {
        if (status === 'error') {
            setPublicDev(null);
        }
        if (status === 'success' && data) {
            setPublicDev(data);
        }
    }, [status, data]);

    return publicDev;
}

export function useDevConnection(currentDev: DevSchema, dev: DevPublicProfile) {
    const [error, setError] = useState<string | undefined>(undefined);
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');

    const isConnected = () => {
        currentDev.profile.connections.forEach((connection) => {
            if (connection.username === dev.username) return true;
        });
        return false;
    };

    async function addDevConnection() {
        setStatus('loading');
        if (isConnected()) {
            setError(`${dev.username} is already a connection`);
            setStatus('error');
            return;
        } else {
            try {
                await firestore()
                    .collection('devs')
                    .doc(currentDev.user.uid)
                    .update({
                        connections: fieldValue.arrayUnion({
                            username: dev.username,
                            image_url: dev.image_url,
                        }),
                    });
            } catch (err) {
                console.error(err.message);
                setError(err.message);
                setStatus('error');
                return;
            }
            setStatus('success');
        }
    }

    async function removeDevConnection() {
        setStatus('loading');
        if (!isConnected()) {
            setError(`${dev.username} is not a connection`);
            setStatus('error');
            return;
        } else {
            try {
                const connections = currentDev.profile.connections.filter(
                    (connection) => connection.username !== dev.username,
                );
                await firestore()
                    .collection('devs')
                    .doc(currentDev.user.uid)
                    .update({
                        connections,
                    });
            } catch (err) {
                console.error(err.message);
                setError(err.message);
                setStatus('error');
            }
        }
    }

    return {
        isConnected,
        status,
        error,
        addDevConnection,
        removeDevConnection,
    };
}
