import React, { MutableRefObject, useEffect, useRef } from "react";
import styled from "styled-components";

export default (props: { localStream?: MediaStream }) => {
    const { localStream } = props;
    const videoRef: MutableRefObject<HTMLVideoElement | null> = useRef(null);

    useEffect(() => {
        if (!localStream || !videoRef.current) return;
        videoRef.current.srcObject = localStream;
    }, [localStream]);

    if (localStream) {
        return (
            <LocalStream>
                <video
                    src="localStream"
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                ></video>
            </LocalStream>
        );
    } else {
        return null;
    }
};

const LocalStream = styled.div`
    height: 240px;
    width: 320px;
    border: 1px solid black;
    box-sizing: content-box;
    > video {
        height: 100%;
        width: 100%;
    }
`;
