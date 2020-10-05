import React from "react";
import styled from "styled-components";
import TopDiv from "../Components/Landing/TopDiv";
import MiddleDiv from "../Components/Landing/MiddleDiv";

export default () => {
    return (
        <LandingPage>
            <MiddleDiv />
            <TopDiv />
        </LandingPage>
    );
};

const LandingPage = styled.div`
    min-height: 100%;
    height: 100%;
    width: 100%;
    > div {
        width: 100%;
        padding: 5%;
    }
`;
