import React, { useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

export default (props: { value?: number; label: string; max: number }) => {
    const value = props.value || 0;
    const oneUnit = (window.innerWidth * 0.8) / (props.max + 1);

    const [bar, setBar] = useSpring(() => ({
        width: 0,
    }));

    useEffect(() => {
        setBar({
            width: oneUnit * value + 100,
        });
    }, [value, oneUnit, setBar]);

    return (
        <StatsBar>
            <h3>{props.label}</h3>
            <animated.div style={bar} />
            <h4>{props.value}</h4>
        </StatsBar>
    );
};

const StatsBar = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    > h3 {
        min-width: 20%;
        width: 20%;
        max-width: 20%;
        margin-right: 10px;
    }
    > div {
        height: 50px;
        max-width: 90%;
        margin-right: 10px;
        background-color: transparent;
        background-image: ${(props) =>
            `linear-gradient(140deg, ${props.theme.orange}, ${props.theme.yellow})`};
    }
`;
