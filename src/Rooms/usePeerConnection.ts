import { DevPublicProfile } from '../Devs/devSchema';
import Peer from 'peerjs';
import { useState } from 'react';

export default function usePeerConnection(
    peer: DevPublicProfile,
    you: Peer,
    localStream: MediaStream,
) {
    const peerConnection = you.connect(peer.uid);
    const [remoteStream, setRemoteStream] = useState<MediaStream | undefined>(
        undefined,
    );

    peerConnection.on('open', () => {
        peerConnection.send('hi!');
        console.log('connecting...');
        const call = you.call(peer.uid, localStream);
        call.on('stream', (stream) => {
            setRemoteStream(stream);
        });
    });

    return { remoteStream };
}
