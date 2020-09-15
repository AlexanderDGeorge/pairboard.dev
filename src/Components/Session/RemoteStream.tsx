import React, { useRef } from "react";
import styled from "styled-components";
// import useRemoteStream from "./useRemoteStream";

export default () => {
    const videoRef = useRef(null);
    // useRemoteStream(videoRef.current);

    return (
        <StyledRemoteStream>
            <video autoPlay ref={videoRef}></video>
            <button></button>
        </StyledRemoteStream>
    );
};

const StyledRemoteStream = styled.div`
    position: relative;
    box-sizing: content-box;
    height: 270px;
    width: 360px;
    border: 1px solid ${(props) => props.theme.verydark};
    > video {
        height: 100%;
        width: 100%;
        background-color: ${(props) => props.theme.accent};
    }
    > button {
        position: absolute;
        bottom: 10px;
        right: 10px;
        padding: 5px;
        color: ${(props) => props.theme.white};
        background-color: rgba(0, 0, 0, 0.5);
    }
`;
