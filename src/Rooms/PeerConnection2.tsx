import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { DevPublicProfile } from '../Devs/devSchema';
import Peer from 'peerjs';
import usePeerConnection from './usePeerConnection';

export default function PeerConnection(props: {
    occupant: DevPublicProfile;
    you: Peer;
    localStream: MediaStream;
}) {
    const { occupant, you, localStream } = props;
    const { remoteStream, peerConnection } = usePeerConnection(
        occupant,
        you,
        localStream,
    );

    const videoRef: React.MutableRefObject<HTMLVideoElement | null> = useRef(
        null,
    );

    // console.log(peerConnection);

    useEffect(() => {
        if (!remoteStream || !videoRef.current) return;
        videoRef.current.srcObject = remoteStream;
    }, [remoteStream]);

    if (remoteStream) {
        return (
            <RemoteStream
                ref={videoRef}
                autoPlay
                playsInline
                src="remoteStream"
            ></RemoteStream>
        );
    } else {
        return null;
    }
}

const RemoteStream = styled.video`
    min-width: 480px;
    width: 50%;
    max-width: 720px;
    border: 2px solid ${(props) => props.theme.accent};
    transform: scaleX(-1);
`;
