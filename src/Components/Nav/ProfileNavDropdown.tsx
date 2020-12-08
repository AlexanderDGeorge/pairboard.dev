import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Application';
import useOnOutsideCLick from '../../util/useOnOutsideClick';
import { signOut } from '../../firebase/auth';

export default function ProfileNavDropdown(props: { setOpen: Function }) {
    const { setOpen } = props;
    const dropdownRef = useRef(null);
    const { username, name } = useContext(UserContext)!;

    const handleLinkClick = () => setOpen(false);

    useOnOutsideCLick(dropdownRef, () => setOpen(false))

    function handleSignOut() {
        signOut();
        handleLinkClick();
    }

    return (
        <StyledDropdown ref={dropdownRef}>
            <h2>{username}</h2>
            <h3>{name}</h3>
            <Link onClick={handleLinkClick} to={`/user/${username}`}>View Profile</Link>
            <Link onClick={handleLinkClick} to='/settings'>Settings</Link>
            <button onClick={handleSignOut}>Sign Out</button>
        </StyledDropdown>
    )
}   

const StyledDropdown = styled.div`
    z-index: 2;
    position: absolute;
    right: 0;
    bottom: -300px;
    height: 300px;
    min-width: 200px;
    /* border: 2px solid ${props => props.theme.accent}; */
    border-radius: 10px;
    padding: 2%;
    /* color: ${props => props.theme.white}; */
    background-color: ${props => props.theme.white};
    box-shadow: 0 2px 20px -4px ${props => props.theme.verydark};
    display: flex;
    flex-direction: column;

    > h2 {
        font-weight: 500;
    }
    > a, button {
        margin: 6px 0;
        text-decoration: none;
        color: ${props => props.theme.medium};
        background-color: inherit;
        text-align: left;
        font-size: 1em;
        &:hover {
            text-decoration: underline;
        }
    }
`;