import React from "react";
import styled, { keyframes } from "styled-components";

export default () => {
    return (
        <Loading>
            <LoadingBar>
                <div></div>
            </LoadingBar>
        </Loading>
    );
};

const Loading = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const load = keyframes`
    from {
        transform: translateX(0vw);
    }

    to {
        transform: translateX(100vw);
    }
`;

const LoadingBar = styled.div`
    position: relative;
    height: 50px;
    min-width: 300px;
    width: 80%;
    margin: 5%;
    border-radius: 50px;
    background-color: transparent;
    overflow: hidden;
    background-image: ${(props) =>
        `linear-gradient(140deg, ${props.theme.orange}, ${props.theme.yellow}, ${props.theme.green}, ${props.theme.blue})`};
    > div {
        height: 100%;
        width: 3%;
        position: absolute;
        animation: ${load} 3s linear infinite;
        background-color: rgba(250, 250, 250, 0.5);
    }
`;
