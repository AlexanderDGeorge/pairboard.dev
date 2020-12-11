import React, { MutableRefObject, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { listenForConnectionEvents } from './WebRTCFunctions';
import {
    listenForCandidates,
    resetRoomNotifications,
} from '../../firebase/room';
import { UserSchema } from '../../firebase/schema';
import { UserContext } from '../../Application';

interface PeerConnectionProps {
    localStream: MediaStream;
    pc: RTCPeerConnection;
    peerId: UserSchema['uid'];
    peers: number;
}

export default function PeerConnection(props: PeerConnectionProps) {
    const { localStream, pc, peerId, peers } = props;
    const { uid } = useContext(UserContext)!;
    const remoteStreamRef: MutableRefObject<HTMLVideoElement | null> = useRef(
        null,
    );

    useEffect(() => {
        resetRoomNotifications(uid);
        listenForCandidates(pc, uid, peerId);
        if (!remoteStreamRef.current) return;
        listenForConnectionEvents(pc, peerId, uid, remoteStreamRef.current);
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
    width: 50%;
    max-width: 720px;
    transform: scaleX(-1);
`;
