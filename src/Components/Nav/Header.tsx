import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import ProfileNav from './ProfileNav';
import logo from '../../Assets/PB.png';

export default function Header() {
    return (
        <StyledHeader>
            <HomeLink to="/" onClick={(e) => e.stopPropagation()}>
                <img src={logo} alt="" />
            </HomeLink>
            <NavLinks />
            <ProfileNav />
        </StyledHeader>
    );
}

const moveGradient = keyframes`
    50% {
        background-position: 100% 50%;
    }
`;

const StyledHeader = styled.header`
    position: relative;
    z-index: 3;
    height: 100px;
    width: 100%;
    padding: 0 15%;
    background-color: ${(props) => props.theme.verydark};
    border-bottom: 8px solid ${(props) => props.theme.verydark};
    /* border-image: ${(props) =>
        `linear-gradient(140deg, ${props.theme.green}, ${props.theme.blue}, ${props.theme.purple}) 3`}; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 1000px) {
        padding: 0 8%;
    }
    @media screen and (max-width: 600px) {
        padding: 0 2%;
    }
    &::after {
        position: absolute;
        content: '';
        bottom: -8px;
        left: 0;
        width: 100%;
        height: 8px;
        background: ${(props) =>
            `linear-gradient(140deg, ${props.theme.green}, ${props.theme.blue}, ${props.theme.purple})`};
        background-size: 300% 300%;
        background-position: 0 50%;
        animation: ${moveGradient} 4s alternate infinite;
    }
`;

const HomeLink = styled(Link)`
    min-height: 60px;
    height: 60px;
    min-width: 60px;
    width: 60px;
    border-radius: 18px;
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.4em;
    font-weight: 100;
    color: ${(props) => props.theme.white};
    box-shadow: 4px 4px 20px -6px ${(props) => props.theme.black};
    transition: all 0.25s linear;
    text-decoration: none;
    outline: none;
    > img {
        height: 60%;
        width: auto;
    }
    &:hover {
        box-shadow: 4px 4px 20px -12px ${(props) => props.theme.black};
    }
    @media screen and (max-width: 400px) {
        display: none;
    }
`;
