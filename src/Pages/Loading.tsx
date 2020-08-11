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

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

const LoadingBar = styled.div`
    position: absolute;
    top: 200%;
    height: 50px;
    min-width: 300px;
    width: 80%;
    border-radius: 50px;
    background-color: transparent;
    overflow: hidden;
    > div {
        height: 110vh;
        width: 110vh;
        position: absolute;
        top: -50vh;
        animation: ${rotate} 3s linear infinite;
        background-color: transparent;
        background-image: ${(props) =>
            `linear-gradient(0deg, ${props.theme.orange}, ${props.theme.yellow}, ${props.theme.green}, ${props.theme.blue})`};
    }
`;
