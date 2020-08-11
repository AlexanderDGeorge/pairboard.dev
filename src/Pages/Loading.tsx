import React from "react";
import styled, { keyframes } from "styled-components";
import Header from "../Nav/Header";

export default () => {
    return (
        <Loading>
            <Header />
            <LoadingBar>
                <div></div>
            </LoadingBar>
        </Loading>
    );
};

const Loading = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const load = keyframes`
    from {
        transform: translateX(100px);
    }

    to {
        transform: translateX(-50px);
    }
`;

const LoadingBar = styled.div`
    position: absolute;
    top: 200%;
    /* left: 0; */
    height: 50px;
    min-width: 300px;
    width: 80%;
    border-radius: 50px;
    background-color: transparent;
    overflow: hidden;
    > div {
        height: 110vh;
        width: 100vw;
        position: absolute;
        top: -50vh;
        animation: ${load} 3s linear 0s infinite alternate;
        background-color: transparent;
        background-image: ${(props) =>
            `linear-gradient(140deg, ${props.theme.orange}, ${props.theme.yellow}, ${props.theme.green}, ${props.theme.blue})`};
    }
`;
