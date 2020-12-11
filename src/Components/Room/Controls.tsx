import React from 'react';
import {
    MdExitToApp,
    MdScreenShare,
    MdVideocam,
    MdVideocamOff,
    MdVolumeOff,
    MdVolumeUp,
} from 'react-icons/md';
import styled from 'styled-components';

export default function Controls(props: {
    audio?: boolean;
    toggleAudio: Function;
    video?: boolean;
    toggleVideo: Function;
    shareScreen: Function;
    handleLeave: Function;
}) {
    const {
        audio,
        toggleAudio,
        video,
        toggleVideo,
        shareScreen,
        handleLeave,
    } = props;

    return (
        <StyledControls>
            <Button onClick={() => toggleAudio()}>
                {!audio ? <MdVolumeUp /> : <MdVolumeOff />}
                {!audio ? 'Unmute' : 'Mute'}
            </Button>
            <Button onClick={() => toggleVideo()}>
                {!video ? <MdVideocam /> : <MdVideocamOff />}
                {!video ? 'Show Video' : 'Hide Video'}
            </Button>
            <Button onClick={() => shareScreen()}>
                <MdScreenShare />
                Share Screen
            </Button>
            <Button onClick={() => handleLeave()}>
                <MdExitToApp />
                Leave
            </Button>
        </StyledControls>
    );
}

const StyledControls = styled.div`
    position: absolute;
    z-index: 3;
    bottom: 0;
    height: 100px;
    width: 100%;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const Button = styled.button`
    z-index: 2;
    height: 80px;
    width: 100px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.verydark};
    color: ${(props) => props.theme.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    cursor: pointer;
    > svg {
        height: 40px;
        width: auto;
        fill: ${(props) => props.theme.white};
    }
`;
