import React, { useContext } from 'react';
import { MdChatBubble, MdGroup, MdHome, MdNotifications } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ModalContext } from '../../Application';
import NotificationModal from '../../Notifications/NotificationModal';

export default function NavLinks() {
    const { handleModal } = useContext(ModalContext)!;

    return (
        <StyledNavLinks>
            <StyledNavLink to="/">
                <MdHome />
                <p>Home</p>
            </StyledNavLink>
            <StyledNavLink to="/messages">
                <MdChatBubble />
                <p>Messages</p>
            </StyledNavLink>
            <StyledNavLink to="/teams">
                <MdGroup />
                <p>Teams</p>
            </StyledNavLink>
            <StyledButton onClick={() => handleModal(<NotificationModal />)}>
                <MdNotifications />
                <p>Notifications</p>
            </StyledButton>
        </StyledNavLinks>
    );
}

const StyledNavLinks = styled.ul`
    height: 60px;
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
`;

const StyledButton = styled.button`
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
    outline: none;
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
`;
