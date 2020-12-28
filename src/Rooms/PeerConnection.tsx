import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { DevPublicProfile } from '../Devs/devSchema';
import Peer from 'peerjs';
import usePeerConnection from './usePeerConnection';
import LoadingBar from '../Components/Animated/LoadingBar';
import Stream from './Stream';

export default function PeerConnection(props: {
    occupant: DevPublicProfile;
    you: Peer;
    localStream: MediaStream;
}) {
    const { occupant, you, localStream } = props;
    const { remoteStream, status } = usePeerConnection(
        occupant,
        you,
        localStream,
    );

    const videoRef: React.MutableRefObject<HTMLVideoElement | null> = useRef(
        null,
    );

    useEffect(() => {
        if (!remoteStream || !videoRef.current) return;
        videoRef.current.srcObject = remoteStream;
    }, [remoteStream]);

    console.log(status);

    switch (status) {
        case 'error':
            return <PeerBox>Error</PeerBox>;
        case 'loading':
            return (
                <PeerBox>
                    <LoadingBar />
                    <h4>{occupant.username}</h4>
                </PeerBox>
            );
        case 'open':
            return <Stream stream={remoteStream!} occupant={occupant} />;
        default:
            return (
                <PeerBox>
                    <LoadingBar />
                </PeerBox>
            );
    }
}

const PeerBox = styled.span`
    position: relative;
    box-sizing: border-box;
    min-width: 480px;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    background-color: ${(props) => props.theme.verydark};
    > div {
        position: absolute;
        top: 40%;
        left: 10%;
    }
    > h4 {
        position: absolute;
        bottom: 0;
        left: 5px;
        height: 20px;
        width: 100%;
        color: ${(props) => props.theme.white};
    }
`;
