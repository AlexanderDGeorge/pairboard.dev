import { DevPublicProfile } from '../Devs/devSchema';
import Peer from 'peerjs';
import { useEffect, useState } from 'react';

export default function usePeerConnection(
    peer: DevPublicProfile,
    you: Peer,
    localStream: MediaStream,
) {
    window.you = you;
    const peerConnection = you.connect(peer.username);
    const [remoteStream, setRemoteStream] = useState<MediaStream | undefined>(
        undefined,
    );

    you.on('connection', (conn) => {
        console.log(conn);
    });

    peerConnection.on('open', () => {
        console.log('peerConnection opened');
    });

    return { remoteStream, peerConnection };
}
