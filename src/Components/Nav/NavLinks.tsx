import React from 'react';
import { MdChatBubble, MdGroup, MdHome, MdNotifications, MdSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ProfileLink from './ProfileLink';

export default function NavLinks() {
    return (
        <StyledNavLinks>
            <StyledNavLink to='/'>
                <MdHome />
            </StyledNavLink>
            <StyledNavLink to='/messages'>
                <MdChatBubble />
            </StyledNavLink>
            <StyledNavLink to='/teams' >
                <MdGroup />
            </StyledNavLink>
            <StyledNavLink to='/settings'>
                <MdSettings />
            </StyledNavLink>
            <StyledNavLink to='/notifications'>
                <MdNotifications />
            </StyledNavLink>
            <ProfileLink />
        </StyledNavLinks>
    )
}

const StyledNavLinks = styled.ul`
    height: 80%;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-image: ${(props) =>
    `linear-gradient(140deg, ${props.theme.green}, ${props.theme.blue}, ${props.theme.purple}, ${props.theme.red})`};
`;

const StyledNavLink = styled(Link)`
    position: relative;
    height: 100%;
    width: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    background-color: ${props => props.theme.verydark};
    transition: all 0.25s linear;
    &:hover {
        transition: all 0.25s linear;
        background: transparent;
    }
    > svg {
        height: 26px;
        width: 26px;
        fill: ${props => props.theme.white};
    }
`;