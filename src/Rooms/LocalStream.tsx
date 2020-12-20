import React, { MutableRefObject, useEffect, useRef } from 'react';
import styled from 'styled-components';

export default function LocalStream(props: { localStream: MediaStream }) {
    const { localStream } = props;
    const videoRef: MutableRefObject<HTMLVideoElement | null> = useRef(null);

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
    border: 2px solid ${(props) => props.theme.accent};
    max-width: 720px;
    transform: scaleX(-1);
`;
