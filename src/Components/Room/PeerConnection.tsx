import React, { useState, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
    initiateConnection,
    listenForConnectionEvents,
} from './WebRTCFunctions';
import {
    listenForCandidates,
    resetRoomNotifications,
} from '../../firebase/room';
import { UserSchema } from '../../firebase/schema';
import { UserContext } from '../../Application';
import LoadingBar from '../Animated/LoadingBar';

interface PeerConnectionProps {
    localStream: MediaStream;
    peerId: UserSchema['uid'];
    peers: number;
    closeConnection: boolean;
}

export default function PeerConnection(props: PeerConnectionProps) {
    const { localStream, peerId, closeConnection } = props;
    const [loading, setLoading] = useState(true);
    const [pc, setPc] = useState<RTCPeerConnection | undefined>(undefined);
    const { uid } = useContext(UserContext)!;
    const remoteStreamRef: React.MutableRefObject<HTMLVideoElement | null> = useRef(
        null,
    );

    useEffect(() => {
        if (closeConnection && pc) {
            console.log('here');
            pc.close();
        }
    }, [closeConnection, pc]);

    useEffect(() => {
        async function startConnection() {
            const connection = await initiateConnection(localStream);
            setPc(connection);
        }
        startConnection();
    }, [localStream]);

    useEffect(() => {
        resetRoomNotifications(uid);
        if (!pc || !remoteStreamRef.current) return;
        listenForCandidates(pc, uid, peerId);
        listenForConnectionEvents(pc, peerId, uid, remoteStreamRef.current);
        setLoading(false);
    }, [uid, peerId, pc]);

    return (
        <RemoteStream
            ref={remoteStreamRef}
            src="remoteStream"
            autoPlay
            playsInline
        >
            {loading ? <LoadingBar /> : null}
        </RemoteStream>
    );
}

const RemoteStream = styled.video`
    min-width: 480px;
    width: 50%;
    max-width: 720px;
    border: 2px solid ${(props) => props.theme.accent};
    transform: scaleX(-1);
`;
