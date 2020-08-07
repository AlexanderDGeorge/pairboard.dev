import React, { useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { useUserContext } from "../State/UserContext";

export default () => {
    const currentUser = useUserContext();
    const [spring, setSpring] = useSpring(() => ({ x: 0 }));

    useEffect(() => {
        setSpring({ x: currentUser?.score || 0 });
        return () => {
            setSpring({ x: 0 });
        };
    }, [currentUser, setSpring]);

    return (
        <Score>
            <h4>Score</h4>
            <animated.div>
                {spring.x.interpolate((x) => x.toFixed(0))}
            </animated.div>
        </Score>
    );
};

const Score = styled.div`
    > h4 {
        color: ${(props) => props.theme.verydark};
        margin-bottom: 10px;
    }
    > div {
        height: 35px;
        margin-bottom: 10px;
        border-radius: 5px;
        padding: 10px;
        background-color: ${(props) => props.theme.light};
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
`;
