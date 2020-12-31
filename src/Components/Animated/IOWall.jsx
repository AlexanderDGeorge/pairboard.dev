import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated, interpolate } from 'react-spring';

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
const calc = (x) => x - window.innerWidth / 2;

export default function IOWall() {
    useEffect(() => {
        function handleMouseMove(e) {
            set({ x: calc(e.clientX) });
        }
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const [props, set] = useSpring(() => ({
        x: 0,
    }));

    return (
        <StyledIOWall>
            {[...streamPos].map((left, i) => (
                <IOStream left={left} key={i} x={props.x} />
            ))}
        </StyledIOWall>
    );
}

function IOStream(props) {
    const { left, x } = props;
    const random = Math.random();

    const { y } = useSpring({
        to: {
            y: '-100%',
        },
        from: {
            y: '100%',
        },
        config: {
            duration: 75000 * random,
        },
        reset: true,
    });
    return (
        <StyledIOStream
            style={{
                transform: interpolate(
                    [y, x],
                    (y, x) =>
                        `translate3d(${(x / 5) * (1 - random)}px, ${y}, ${
                            250 * random
                        }px)`,
                ),
                left: `${left}%`,
                opacity: random,
            }}
        >
            {ioStream.map((num) => num)}
        </StyledIOStream>
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
    overflow: hidden;
    transform-style: preserve-3d;
    perspective: 800px;
`;

const StyledIOStream = styled(animated.div)`
    position: absolute;
    height: 100%;
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
