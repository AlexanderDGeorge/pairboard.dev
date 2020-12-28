import { DevPublicProfile } from '../Devs/devSchema';
import Peer, { MediaConnection } from 'peerjs';
import { useContext, useEffect, useState } from 'react';
import { CurrentDevContext } from '../Application';

export default function usePeerConnection(
    peer: DevPublicProfile,
    you: Peer,
    localStream: MediaStream,
) {
    const { profile } = useContext(CurrentDevContext)!;
    const polite = profile.uid > peer.uid;
    const [status, setStatus] = useState<
        'open' | 'closed' | 'error' | 'loading'
    >('loading');
    const [peerConnection, setPeerConnection] = useState<
        MediaConnection | undefined
    >(undefined);

    const [remoteStream, setRemoteStream] = useState<MediaStream | undefined>(
        undefined,
    );

    console.log(status);

    useEffect(() => {
        if (!polite) {
            setPeerConnection(you.call(peer.uid, localStream));
        } else {
            you.on('call', (mediaConnection) => {
                setPeerConnection(mediaConnection);
                mediaConnection.answer(localStream);
            });
        }
    }, [peer.uid, you, localStream, polite]);

    useEffect(() => {
        if (peerConnection) {
            peerConnection.on('stream', (stream) => {
                console.log('here');
                setRemoteStream(stream);
                setStatus('open');
            });

            peerConnection.on('error', (error) => {
                setStatus('error');
                console.log(error);
            });

            peerConnection.on('close', () => {
                setStatus('closed');
            });
        }
    }, [peerConnection]);

    return { remoteStream, status };
}
