import React from 'react';
import styled, { keyframes } from 'styled-components';

export default function LoadingBar() {
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
    height: 10%;
    min-height: 20px;
    width: 80%;
    margin: 10px;
    border-radius: 50px;
    box-shadow: 0 0 10px -2px ${(props) => props.theme.verydark};
    background-color: transparent;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: ${(props) =>
        `linear-gradient(40deg, ${props.theme.orange}, ${props.theme.yellow}, ${props.theme.green}, ${props.theme.blue})`};
    > div {
        height: 100%;
        width: 100%;
        animation: ${load} 2s linear alternate infinite;
        background-color: rgba(250, 250, 250, 0.5);
    }
`;
