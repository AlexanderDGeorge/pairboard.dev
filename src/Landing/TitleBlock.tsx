import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTransition, animated } from "react-spring";

const titles = [
    "Developer",
    "Engineer",
    "Teammate",
    "Programmer",
    "Coder",
    "Pair",
    "Follower",
    "Leader",
    "Innovator",
    "Builder",
    "Planner",
];

export default () => {
    const [index, setIndex] = useState(0);
    const transitions = useTransition(index, (p) => p, {
        from: { opacity: 0, transform: "translate3d(0,100%,0)" },
        enter: { opacity: 1, transform: "translate3d(0,0%,0)" },
        leave: { opacity: 0, transform: "translate3d(0,-50%,0)" },
    });

    useEffect(() => {
        setTimeout(() => {
            setIndex(Math.random() * titles.length);
        }, 5000);
    }, [index]);

    const AnimatedBlock = animated(TitleBlock);

    return (
        <>
            {transitions.map(({ item, props, key }) => (
                <AnimatedBlock key={key} style={props}>
                    {titles[item]}
                </AnimatedBlock>
            ))}
        </>
    );
};

const TitleBlock = styled.h1``;
