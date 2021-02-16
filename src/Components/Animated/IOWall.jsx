import React, { useEffect, useRef } from 'react';
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
    while (temp.size < 30) {
        temp.add(getRandomInt(101));
    }
    return temp;
};

const ioStream = generateIOStream();
const streamPos = generateStreamPos();
const calc = (x) => x - window.innerWidth / 2;

export default function IOWall() {
    const [props, set] = useSpring(() => ({
        x: 0,
    }));

    useEffect(() => {
        function handleMouseMove(e) {
            set({ x: calc(e.clientX) });
        }
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [set]);

    return (
        <StyledIOWall>
            {[...streamPos].map((left, i) => (
                <IOStream left={left} key={i} i={i - 15} x={props.x} />
            ))}
        </StyledIOWall>
    );
}

const IOStream = React.memo(({ left, i, x }) => {
    const random = useRef(Math.random());

    const { y } = useSpring({
        from: {
            y: '100%',
        },
        to: {
            y: '-100%',
        },
        config: {
            duration: 75000 * random.current,
        },
    });

    return (
        <StyledIOStream
            style={{
                transform: interpolate(
                    [y, x],
                    (y, x) =>
                        `translate3d(${
                            (x / 5) * (1 - random.current)
                        }px, ${y}, ${10 * random.current * Math.abs(i)}px)`,
                ),
                left: `${left}%`,
                opacity: random.current,
            }}
        >
            {ioStream.map((num) => num)}
        </StyledIOStream>
    );
});

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
    animation-iteration-count: infinite;
`;
