import React from 'react';
import TopDiv from '../Landing/TopDiv';
import BetterDevDiv from '../Landing/BetterDevDiv';
import CallToAction from '../Landing/CallToAction';
import styled from 'styled-components';
import mesh from '../Assets/landing-mesh.png';
import LandingHeader from '../Landing/Header';

export default function LandingPage() {
    return (
        <StyledLandingPage>
            <LandingHeader />
            <CallToAction />
            {/* <BetterDevDiv /> */}
            <TopDiv />
        </StyledLandingPage>
    );
}

const StyledLandingPage = styled.div`
    min-height: 100%;
    padding: 2% 15%;
    background-image: url(${mesh});
    @media screen and (max-width: 1000px) {
        padding: 0 8%;
    }
    @media screen and (max-width: 600px) {
        padding: 0 2%;
    }
`;
