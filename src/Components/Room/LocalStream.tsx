import React, { MutableRefObject, useEffect, useRef } from 'react';
import styled from 'styled-components';

export default function LocalStream(props: { localStream?: MediaStream }) {
    const { localStream } = props;
    const videoRef: MutableRefObject<HTMLVideoElement | null> = useRef(null);

    useEffect(() => {
        console.log(localStream);
        if (!localStream || !videoRef.current) return;
        videoRef.current.srcObject = localStream;
    }, [localStream]);

    if (localStream) {
        return (
            <StyledLocalStream
                src="localStream"
                ref={videoRef}
                autoPlay
                playsInline
                muted
            ></StyledLocalStream>
        );
    } else {
        return null;
    }
}

const StyledLocalStream = styled.video`
    min-width: 480px;
    max-width: 720px;
    transform: scaleX(-1);
`;
