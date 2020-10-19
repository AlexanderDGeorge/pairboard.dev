import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

export default (props: { controls: any }) => {
    const {
        muted,
        toggleAudio,
        turnOffVideo,
        turnOnVideo,
        shareScreen,
        handleLeave,
    } = props.controls;
    const [controlsMenu, setControlsMenu] = useSpring(() => ({
        left: 0,
    }));

    useEffect(() => {
        setTimeout(() => {
            setControlsMenu({ left: -180 });
        }, 1500);
        // eslint-disable-next-line
    }, []);

    return (
        <Controls
            onMouseEnter={() => setControlsMenu({ left: 0 })}
            onMouseLeave={() => setControlsMenu({ left: -180 })}
            style={controlsMenu}
        >
            <Button onClick={() => handleLeave()}>Leave Room</Button>
            <Button onClick={() => toggleAudio()}>
                {muted ? "Unmute" : "Mute"}
            </Button>
            <Button onClick={() => shareScreen()}>Share Screen</Button>
            <Button onClick={() => turnOffVideo()}>Hide Video</Button>
            <Button onClick={() => turnOnVideo()}>Show Video</Button>
        </Controls>
    );
};

const Controls = styled(animated.div)`
    z-index: 1;
    position: absolute;
    height: 100%;
    width: 200px;
    border-right: 10px solid ${(props) => props.theme.verydark};
    padding: 25% 10px 10px 10px;
    background-color: ${(props) => props.theme.verydark};
    border-image: ${(props) =>
        `linear-gradient(140deg, ${props.theme.orange}, ${props.theme.yellow}, ${props.theme.green}, ${props.theme.blue}) 3`};
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
`;

const Button = styled.button`
    height: 60px;
    min-width: 100px;
    font-size: 1em;
    background-color: transparent;
    color: ${(props) => props.theme.verylight};
    transition: color 0.25s linear;
    &:hover {
        transition: color 0.25s linear;
        color: ${(props) => props.theme.white};
    }
`;
