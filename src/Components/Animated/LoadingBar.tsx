import React from 'react';
import styled, { keyframes } from 'styled-components';

export default function LoadingBar() {
    return <StyledLoadingBar>{/* <div></div> */}</StyledLoadingBar>;
}

const load = keyframes`
    from {
        transform: translateX(-100%);
    }

    to {
        transform: translateX(1010%);
    }
`;

const moveGradient = keyframes`
    50% {
        background-position: 100% 50%;
    }
`;

const StyledLoadingBar = styled.div`
    position: relative;
    height: 40vw;
    width: 40vw;
    border-radius: 50%;
    box-shadow: 0 0 10px -2px ${(props) => props.theme.verydark};
    background-color: transparent;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-image: ${(props) =>
        `linear-gradient(140deg, ${props.theme.green}, ${props.theme.blue}, ${props.theme.purple})`}; */
    &::before {
        z-index: 1;
        position: absolute;
        height: 30vw;
        width: 30vw;
        border-radius: 50%;
        background: white;
        content: '';
    }
    &::after {
        position: absolute;
        content: '';
        left: 0;
        width: 100%;
        height: 100%;
        background: ${(props) =>
            `linear-gradient(140deg, ${props.theme.green}, ${props.theme.blue}, ${props.theme.purple})`};
        background-size: 300% 300%;
        background-position: 0 50%;
        animation: ${moveGradient} 2s infinite;
    }
`;
