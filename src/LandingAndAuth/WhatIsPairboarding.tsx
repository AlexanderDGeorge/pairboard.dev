import React from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';
import { Link } from 'react-router-dom';

export default function WhatIsPairboarding() {
    return (
        <StyledInfo>
            <animated.h1>What is...</animated.h1>
            <Link to="/login">Login</Link>
        </StyledInfo>
    );
}

const StyledInfo = styled.div`
    z-index: 1;
    height: 1000px;
    width: 100%;
    padding: 6% 15%;
    background: ${(props) => props.theme.verylight};
    filter: ${(props) => `drop-shadow(4px 0 20px ${props.theme.verydark})`};
    @media screen and (max-width: 1000px) {
        padding: 6% 8%;
    }
    @media screen and (max-width: 600px) {
        padding: 6% 2%;
    }
    > h1 {
        font-size: 5em;
        font-weight: 600;
    }
    > a {
        height: 200px;
        width: 200px;
        background-color: black;
        &:hover {
            box-shadow: 4px 4px 20px -10px black;
        }
    }
`;
