import React from "react";
import styled, { keyframes } from "styled-components";

export function LoadingBar() {
    return (
        <StyledLoadingBar>
            <div></div>
        </StyledLoadingBar>
    );
}

const load = keyframes`
    from {
        transform: translateX(-100%);
    }

    to {
        transform: translateX(1010%);
    }
`;

const StyledLoadingBar = styled.div`
    position: relative;
    height: 40px;
    width: 80%;
    margin: 10px;
    border-radius: 50px;
    box-shadow: 0 0 10px -2px ${(props) => props.theme.verydark};
    background-color: transparent;
    overflow: hidden;
    background-image: ${(props) =>
        `linear-gradient(40deg, ${props.theme.orange}, ${props.theme.yellow}, ${props.theme.green}, ${props.theme.blue})`};
    > div {
        position: absolute;
        height: 100%;
        width: 10%;
        animation: ${load} 2s linear alternate infinite;
        background-color: rgba(250, 250, 250, 0.5);
    }
`;
