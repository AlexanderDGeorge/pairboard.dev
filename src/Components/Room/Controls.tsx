import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

export default function Controls(props: { controls: any }) {
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
    const [selector, setSelector] = useSpring(() => ({
        bottom: 10,
    }));

    useEffect(() => {
        setTimeout(() => {
            setControlsMenu({ left: -180 });
        }, 1500);
        // eslint-disable-next-line
    }, []);

    return (
        <StyledControls
            onMouseEnter={() => setControlsMenu({ left: 0 })}
            onMouseLeave={() => setControlsMenu({ left: -180 })}
            style={controlsMenu}
        >
            <Button onClick={() => handleLeave()}>Leave Room</Button>
            <Button onClick={() => toggleAudio()}>
                {muted ? "Unmute" : "Mute"}
            </Button>
            <div>
                <animated.span style={selector}></animated.span>
                <Button
                    onClick={() => {
                        shareScreen();
                        setSelector({ bottom: 130 });
                    }}
                >
                    Share Screen
                </Button>
                <Button
                    onClick={() => {
                        turnOffVideo();
                        setSelector({ bottom: 70 });
                    }}
                >
                    Hide Video
                </Button>
                <Button
                    onClick={() => {
                        turnOnVideo();
                        setSelector({ bottom: 10 });
                    }}
                >
                    Show Video
                </Button>
            </div>
        </StyledControls>
    );
}

const StyledControls = styled(animated.div)`
    z-index: 1;
    position: fixed;
    height: 100%;
    width: 200px;
    border-right: 10px solid ${(props) => props.theme.verydark};
    padding: 25% 10px 10px 10px;
    background-color: ${(props) => props.theme.verydark};
    border-image: ${(props) =>
        `linear-gradient(140deg, ${props.theme.orange}, ${props.theme.yellow}, ${props.theme.green}, ${props.theme.blue}) 3`};
    display: flex;
    flex-direction: column-reverse;
    > div {
        position: relative;
        width: 100%;
        border-top: 1px solid ${(props) => props.theme.accent};
        border-bottom: 1px solid ${(props) => props.theme.accent};
        padding: 10px 0;
        background-color: transparent;
        > span {
            z-index: 1;
            position: absolute;
            bottom: 0;
            height: 60px;
            width: 100%;
            background-color: ${(props) => props.theme.green};
            opacity: 0.4;
        }
    }
`;

const Button = styled.button`
    height: 60px;
    width: 100%;
    font-size: 1em;
    background-color: transparent;
    color: ${(props) => props.theme.verylight};
    transition: color 0.25s linear;
    &:hover {
        transition: color 0.25s linear;
        color: ${(props) => props.theme.white};
    }
`;
