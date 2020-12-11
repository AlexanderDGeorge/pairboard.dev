import React, { MutableRefObject, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { listenForConnectionEvents } from './WebRTCFunctions';
import { listenForCandidates } from '../../firebase/room';
import { UserSchema } from '../../firebase/schema';
import { UserContext } from '../../Application';

interface PeerConnectionProps {
    localStream: MediaStream;
    pc: RTCPeerConnection;
    peerId: UserSchema['uid'];
}

export default function PeerConnection(props: PeerConnectionProps) {
    const { localStream, pc, peerId } = props;
    const { uid } = useContext(UserContext)!;
    const remoteStreamRef: MutableRefObject<HTMLVideoElement | null> = useRef(
        null,
    );

    useEffect(() => {
        (async () => {
            if (!remoteStreamRef.current || !localStream) return;
            listenForConnectionEvents(pc, peerId, uid, remoteStreamRef.current);
        })();
    }, [uid, peerId, localStream]);

    useEffect(() => {
        listenForCandidates(pc, uid, peerId);
    }, [uid, peerId, pc, localStream]);

    return (
        <RemoteStream
            ref={remoteStreamRef}
            src="remoteStream"
            autoPlay
            playsInline
        ></RemoteStream>
    );
}

const RemoteStream = styled.video`
    min-width: 480px;
    max-width: 720px;
    transform: scaleX(-1);
    /* border: 2px solid ${(props) => props.theme.verydark}; */
`;
