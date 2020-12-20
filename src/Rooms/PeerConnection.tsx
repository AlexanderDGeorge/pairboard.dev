import React, { useState, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
    initiateConnection,
    listenForConnectionEvents,
} from './WebRTCFunctions';
import { listenForCandidates, resetRoomNotifications } from '../firebase/room';
import { CurrentDevContext } from '../Application';
import { DevPublicProfile } from '../Devs/devSchema';

interface PeerConnectionProps {
    localStream: MediaStream;
    peerId: DevPublicProfile['uid'];
    peers: number;
    closeConnection: boolean;
}

export default function PeerConnection(props: PeerConnectionProps) {
    const { localStream, peerId, closeConnection } = props;
    const [pc, setPc] = useState<RTCPeerConnection | undefined>(undefined);
    const { user } = useContext(CurrentDevContext)!;
    const remoteStreamRef: React.MutableRefObject<HTMLVideoElement | null> = useRef(
        null,
    );

    window.pc = pc;

    useEffect(() => {
        if (closeConnection && pc) {
            console.log('here');
            pc.close();
        }
    }, [closeConnection, pc]);

    useEffect(() => {
        async function startConnection() {
            await resetRoomNotifications(peerId, user.uid);
            const connection = await initiateConnection(localStream);
            if (connection) {
                setPc(connection);
                listenForConnectionEvents(
                    connection,
                    peerId,
                    user.uid,
                    remoteStreamRef.current!,
                );
                listenForCandidates(connection, user.uid, peerId);
            }
        }
        startConnection();
    }, [localStream, peerId, user.uid]);

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
    border: 2px solid ${(props) => props.theme.accent};
    transform: scaleX(-1);
`;
