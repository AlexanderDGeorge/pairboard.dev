import React from "react";
import styled from "styled-components";

export default (props: { difficulty: string }) => {
    function determineColor() {
        if (props.difficulty === "Easy") {
            return { backgroundColor: "#06D6A0" };
        } else if (props.difficulty === "Medium") {
            return { backgroundColor: "#009FF5" };
        } else {
            return { backgroundColor: "#FF890A" };
        }
    }

    return <Difficulty style={determineColor()}>{props.difficulty}</Difficulty>;
};

const Difficulty = styled.div`
    grid-area: difficulty;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0 0 0 5px;
    color: ${(props) => props.theme.white};
`;
