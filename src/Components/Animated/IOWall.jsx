import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { Keyframes } from 'react-spring/renderprops';

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

const generateIOStream = () => {
    const temp = [];
    for (let i = 0; i < 1000; i++) {
        temp.push(getRandomInt(2));
    }
    return temp;
};

const generateStreamPos = () => {
    const temp = new Set();
    while (temp.size < 50) {
        temp.add(getRandomInt(101));
    }
    return temp;
};

const ioStream = generateIOStream();
const streamPos = generateStreamPos();
const delay = Math.random();
const calc = (x) => x - window.innerWidth / 2;

const Stream = Keyframes.Spring(async (next) => {
    while (true) {
        await next({
            y: '-100%',
            from: { y: '100%' },
            reset: true,
            config: {
                duration: 50000,
            },
        });
    }
});

export default function IOWall() {
    const [props, set] = useSpring(() => ({
        x: 0,
    }));

    return (
        <StyledIOWall>
            <EventWrapper
                onMouseMove={({ clientX: x }) => set({ x: calc(x) })}
            />
            <Stream>
                {({ y }) => {
                    return [...streamPos].map((left, i) => {
                        switch (left % 3) {
                            case 0:
                                return (
                                    <SmallIOStream
                                        key={i}
                                        style={{
                                            animationDelay: `${i * delay}s`,
                                            transform: props.x.interpolate(
                                                (x) =>
                                                    `translate3d(${
                                                        x / 30
                                                    }px, ${y}, 0)`,
                                            ),
                                            left: `${left}%`,
                                        }}
                                    >
                                        {ioStream.map((num) => num)}
                                    </SmallIOStream>
                                );
                            case 1:
                                return (
                                    <MediumIOStream
                                        key={i}
                                        style={{
                                            animationDelay: `${i * delay}s`,
                                            transform: props.x.interpolate(
                                                (x) =>
                                                    `translate3d(${
                                                        x / 40
                                                    }px, ${y}, 0)`,
                                            ),
                                            left: `${left}%`,
                                        }}
                                    >
                                        {ioStream.map((num) => num)}
                                    </MediumIOStream>
                                );
                            case 2:
                                return (
                                    <LargeIOStream
                                        key={i}
                                        style={{
                                            animationDelay: `${i * delay}s`,

                                            transform: props.x.interpolate(
                                                (x) =>
                                                    `translate3d(${
                                                        x / 50
                                                    }px, ${y}, 0)`,
                                            ),
                                            left: `${left}%`,
                                        }}
                                    >
                                        {ioStream.map((num) => num)}
                                    </LargeIOStream>
                                );
                            default:
                                return (
                                    <SmallIOStream
                                        key={i}
                                        style={{
                                            transform: props.x.interpolate(
                                                (x) =>
                                                    `translate3d(${
                                                        x / 10
                                                    }px, ${y}, 0)`,
                                            ),
                                            left: `${left}%`,
                                        }}
                                    >
                                        {ioStream.map((num) => num)}
                                    </SmallIOStream>
                                );
                        }
                    });
                }}
            </Stream>
        </StyledIOWall>
    );
}

const StyledIOWall = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    overflow: hidden;
`;

const EventWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 5;
`;

const falling = keyframes`
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(-100%);
    }
`;

const columnStyling = css`
    position: absolute;
    height: 100%;
    /* animation-name: ${falling}; */
    /* animation-timing-function: linear; */
    font-family: monospace;
    text-align: center;
    text-orientation: upright;
    writing-mode: vertical-lr;
    color: ${(props) => props.theme.green};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;
`;

const SmallIOStream = styled(animated.div)`
    ${columnStyling};
    animation-duration: 50s;
    opacity: 0.3;
    font-size: 0.7em;
`;

const MediumIOStream = styled(animated.div)`
    ${columnStyling};
    animation-duration: 40s;
    opacity: 0.5;
    font-size: 1em;
`;

const LargeIOStream = styled(animated.div)`
    ${columnStyling};
    opacity: 0.7;
    font-size: 1.3em;
`;
