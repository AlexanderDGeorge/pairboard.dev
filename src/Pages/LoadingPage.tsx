import React from "react";
import styled from "styled-components";
import LoadingBar from "../Components/Animated/LoadingBar";

export default function LoadingPage() {
    return (
        <StyledLoadingPage>
            <LoadingBar />
        </StyledLoadingPage>
    );
}

const StyledLoadingPage = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    padding: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
