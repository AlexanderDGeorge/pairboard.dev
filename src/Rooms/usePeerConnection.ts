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
    const [status, setStatus] = useState('loading');
    const [peerConnection, setPeerConnection] = useState<
        MediaConnection | undefined
    >(undefined);

    const [remoteStream, setRemoteStream] = useState<MediaStream | undefined>(
        undefined,
    );

    console.log(peerConnection);

    useEffect(() => {
        if (!polite) {
            setPeerConnection(you.call(peer.username, localStream));
        } else {
            you.on('call', (mediaConnection) => {
                setPeerConnection(mediaConnection);
                mediaConnection.answer(localStream);
                console.log(mediaConnection);
            });
        }
    }, [peer.username, you, localStream, polite]);

    useEffect(() => {
        if (peerConnection) {
            console.log('here');
            peerConnection.on('stream', (stream) => {
                console.log(stream);
                setRemoteStream(stream);
            });
        }
    }, [peerConnection]);

    // useEffect(() => {
    //     setPeerConnection(you.call(peer.username, localStream));
    // }, [peer.username, you, localStream]);

    return { remoteStream };
}
