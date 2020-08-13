import React from "react";
import styled from "styled-components";
import Header from "../Nav/Header";
import TopDiv from "../Landing/TopDiv";
import MiddleDiv from "../Landing/MiddleDiv";
import Footer from "../Nav/Footer";

export default function LandingPage() {
    return (
        <LandingContainer>
            <Header />
            <MiddleDiv />
            <TopDiv />
            <Footer />
        </LandingContainer>
    );
}

const LandingContainer = styled.div`
    height: 100%;
    width: 100%;
    > div {
        width: 100%;
        padding: 5%;
    }
`;
