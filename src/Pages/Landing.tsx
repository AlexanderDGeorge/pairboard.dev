import React from "react";
import styled from "styled-components";
import TopDiv from "../Landing/TopDiv";
import MiddleDiv from "../Landing/MiddleDiv";

export default function LandingPage() {
    return (
        <LandingContainer>
            <MiddleDiv />
            <TopDiv />
        </LandingContainer>
    );
}

const LandingContainer = styled.div`
    min-height: 100%;
    height: 100%;
    width: 100%;
    > div {
        width: 100%;
        padding: 5%;
    }
`;
