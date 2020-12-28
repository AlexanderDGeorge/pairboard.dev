import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { CurrentDevContext } from '../Application';
import { DevPublicProfile } from '../Devs/devSchema';

export default function Stream(props: {
    stream: MediaStream;
    occupant: DevPublicProfile;
}) {
    const { stream, occupant } = props;
    const { uid } = useContext(CurrentDevContext)!.profile;
    const videoRef: React.MutableRefObject<HTMLVideoElement | null> = useRef(
        null,
    );

    function setStream(ele: HTMLVideoElement) {
        if (ele) {
            videoRef.current = ele;
            videoRef.current.srcObject = stream;
        }
    }

    return (
        <StyledStream>
            <video
                ref={setStream}
                autoPlay
                playsInline
                muted={uid === occupant.uid}
            ></video>
            <div>{occupant.username}</div>
        </StyledStream>
    );
}

const StyledStream = styled.div`
    position: relative;
    height: min-content;
    /* background-color: ${(props) => props.theme.verydark}; */
    > video {
        min-width: 480px;
        width: 100%;
        transform: scaleX(-1);
    }
    > div {
        position: absolute;
        bottom: 0;
        left: 5px;
        height: 20px;
        width: 100%;
        color: ${(props) => props.theme.white};
    }
`;
