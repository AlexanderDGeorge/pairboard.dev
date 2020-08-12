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
        @media screen and (max-width: 500px) {
            width: 100px;
        }
        width: 200px;
        margin-right: 5%;
    }
    > div {
        @media screen and (max-width: 500px) {
            max-width: calc(95% - 140px);
        }
        height: 50px;
        max-width: calc(95% - 240px);
        margin-right: 10px;
        background-color: transparent;
        background-image: ${(props) =>
            `linear-gradient(140deg, ${props.theme.orange}, ${props.theme.yellow})`};
    }
`;
