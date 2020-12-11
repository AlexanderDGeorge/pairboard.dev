import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export default function LocalStream(props: { localStream: MediaStream }) {
    const { localStream } = props;
    const videoRef: MutableRefObject<HTMLVideoElement | null> = useRef(null);
    const audioRef = useRef(localStream.getAudioTracks()[0].enabled);
    const [video, setVideo] = useState(localStream.getVideoTracks()[0].enabled);
    const [audio, setAudio] = useState(localStream.getAudioTracks()[0].enabled);

    useEffect(() => {}, [audioRef.current]);

    useEffect(() => {
        if (!localStream || !videoRef.current) return;
        videoRef.current.srcObject = localStream;
    }, [localStream]);

    return (
        <StyledLocalStream
            src="localStream"
            ref={videoRef}
            autoPlay
            playsInline
            muted
        ></StyledLocalStream>
    );
}

const StyledLocalStream = styled.video`
    min-width: 480px;
    width: 50%;
    max-width: 720px;
    transform: scaleX(-1);
`;
