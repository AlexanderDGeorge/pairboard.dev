import React from 'react';
import SearchPairConnect from '../LandingAndAuth/SearchPairConnect';
import CallToAction from '../LandingAndAuth/CallToAction';
import WhatIsPairboarding from '../LandingAndAuth/WhatIsPairboarding';
import styled from 'styled-components';
import mesh from '../Assets/landing-mesh.png';
import LandingHeader from '../LandingAndAuth/Header';
import IOWall from '../Components/Animated/IOWall';

// const mesh = lazy(() => import('../Assets/landing-mesh'));

export default function LandingPage() {
    return (
        <>
            <StyledLandingPage>
                <IOWall />
                <LandingHeader />
                <CallToAction />
                <SearchPairConnect />
            </StyledLandingPage>
            <WhatIsPairboarding />
        </>
    );
}

const StyledLandingPage = styled.div`
    position: relative;
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
