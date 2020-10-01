import React from "react";
import styled from "styled-components";
import TopDiv from "../Components/Landing/TopDiv";
import MiddleDiv from "../Components/Landing/MiddleDiv";
import Footer from "../Components/Nav/Footer";
import Header from "../Components/Nav/Header";

export default () => {
    return (
        <LandingPage>
            <Header />
            <MiddleDiv />
            <TopDiv />
            <Footer />
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
