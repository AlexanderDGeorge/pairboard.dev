import React, { useContext } from 'react';
import {
    MdChatBubble,
    MdGroup,
    MdHome,
    MdNotifications,
    MdSearch,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ModalContext } from '../../Application';
import NotificationModal from '../../Notifications/NotificationModal';
import SearchModal from '../Search/SearchModal';

export default function NavLinks() {
    const { handleModal } = useContext(ModalContext)!;

    return (
        <StyledNavLinks>
            <StyledNavLink to="/">
                <MdHome />
                <p>Home</p>
            </StyledNavLink>
            <StyledButton onClick={() => handleModal(<NotificationModal />)}>
                <MdNotifications />
                <p>Notifications</p>
            </StyledButton>
            <StyledButton onClick={() => handleModal(<SearchModal />)}>
                <MdSearch />
                <p>Search</p>
            </StyledButton>
            <StyledNavLink to="/messages">
                <MdChatBubble />
                <p>Messages</p>
            </StyledNavLink>
            <StyledNavLink to="/teams">
                <MdGroup />
                <p>Teams</p>
            </StyledNavLink>
        </StyledNavLinks>
    );
}

const StyledNavLinks = styled.ul`
    height: 60px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 4px 4px 20px -8px ${(props) => props.theme.black};
    background-image: ${(props) =>
        `linear-gradient(140deg, ${props.theme.green}, ${props.theme.blue}, ${props.theme.purple}, ${props.theme.red})`};
    > a:first-of-type {
        border-top-left-radius: 18px;
        border-bottom-left-radius: 18px;
    }
    > a:last-of-type {
        border-top-right-radius: 18px;
        border-bottom-right-radius: 18px;
    }
`;

const sharedNavLinkStyling = css`
    position: relative;
    height: 100%;
    width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    background-color: ${(props) => props.theme.verydark};
    transition: all 0.25s linear;
    font-size: 1em;
    &:hover {
        transition: all 0.25s linear;
        background: transparent;
    }
    > svg {
        height: 26px;
        width: 26px;
        fill: ${(props) => props.theme.white};
    }
    > p {
        color: ${(props) => props.theme.white};
        font-size: 0.8em;
    }
    @media screen and (max-width: 700px) {
        width: 40px;
        > p {
            display: none;
        }
    }
`;

const StyledNavLink = styled(Link)`
    ${sharedNavLinkStyling};
`;

const StyledButton = styled.button`
    ${sharedNavLinkStyling};
`;
