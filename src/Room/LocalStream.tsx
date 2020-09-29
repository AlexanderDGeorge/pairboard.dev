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
    z-index: 1;
    position: absolute;
    top: 10px;
    left: 10px;
    height: 240px;
    width: 320px;
    box-shadow: 0 0 20px -5px;
    > video {
        height: 100%;
        width: 100%;
    }
`;
