import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CurrentDevContext } from '../../Application';
import useOnOutsideCLick from '../../util/useOnOutsideClick';
import { auth } from '../../firebase';

export default function ProfileNavDropdown(props: { setOpen: Function }) {
    const { setOpen } = props;
    const dropdownRef = useRef(null);
    const { username, name } = useContext(CurrentDevContext)!.profile;

    const handleLinkClick = () => setOpen(false);

    useOnOutsideCLick(dropdownRef, () => setOpen(false));

    function handleSignOut() {
        auth.signOut();
        handleLinkClick();
    }

    return (
        <StyledDropdown ref={dropdownRef}>
            <h2>{username}</h2>
            <h3>{name}</h3>
            <Link onClick={handleLinkClick} to={`/dev/${username}`}>
                View Profile
            </Link>
            <Link onClick={handleLinkClick} to="/settings/profile">
                Settings
            </Link>
            <button onClick={handleSignOut}>Sign Out</button>
        </StyledDropdown>
    );
}

const StyledDropdown = styled.div`
    z-index: -1;
    position: absolute;
    right: 0;
    top: 0;
    height: 300px;
    min-width: 200px;
    border-radius: 18px;
    padding: 5px 80px 5px 5px;
    box-shadow: 4px 4px 20px -6px ${(props) => props.theme.verydark};
    background: white;
    /* background: ${(props) =>
        `radial-gradient(ellipse at -40% -150%, ${props.theme.white} 36%, transparent)`}; */
    display: flex;
    flex-direction: column;

    > h2 {
        font-weight: 500;
    }
    > a,
    button {
        margin: 6px 0;
        text-decoration: none;
        color: ${(props) => props.theme.blue};
        background-color: inherit;
        text-align: left;
        font-size: 1em;
        &:hover {
            text-decoration: underline;
        }
    }
`;
