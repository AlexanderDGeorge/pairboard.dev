import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

export default (props: {
    muted: boolean;
    toggleAudio: Function;
    videoSource: "webcam" | "screen" | "hidden";
    setVideoSource: Function;
    handleLeave: Function;
}) => {
    const {
        muted,
        toggleAudio,
        videoSource,
        setVideoSource,
        handleLeave,
    } = props;
    const [controls, setControls] = useSpring(() => ({
        left: 0,
    }));

    useEffect(() => {
        setTimeout(() => {
            setControls({ left: -180 });
        }, 1500);
        // eslint-disable-next-line
    }, []);

    function handleControls(e: React.SyntheticEvent) {
        console.log(e.target);
    }

    return (
        <Controls
            onMouseEnter={() => setControls({ left: 0 })}
            onMouseLeave={() => setControls({ left: -180 })}
            style={controls}
        >
            <Button onClick={() => handleLeave()}>Leave Room</Button>
            <Button onClick={() => toggleAudio()}>
                {muted ? "Unmute" : "Mute"}
            </Button>
            <Button onClick={handleControls}>
                {videoSource === "hidden" ? "Show Video" : "Hide Video"}
            </Button>
            <Button onClick={() => setVideoSource("screen")}>
                Share Screen
            </Button>
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
