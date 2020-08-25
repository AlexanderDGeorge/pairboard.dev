import React from "react";
import styled from "styled-components";
import StyledLink from "../styled-components/linkStyle";
import { signOut } from "../firebase/auth";
export default () => {
    return (
        <ProfileNav>
            <StyledLink to="/profile/stats">Stats</StyledLink>
            <StyledLink to="/profile/settings">Settings</StyledLink>
            <StyledButtonLink onClick={signOut}>Log Out</StyledButtonLink>
        </ProfileNav>
    );
};

const StyledButtonLink = styled.button`
    height: 100%;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: ${(props) => props.theme.verydark};
    font-size: 1em;
    outline: none;
    cursor: pointer;
    transition: color 0.2s ease-out;
    &:hover {
        color: ${(props) => props.theme.accent};
        transition: color 0.2s ease-in;
    }
`;

const ProfileNav = styled.div`
    z-index: 1;
    height: 60px;
    width: 100%;
    padding: 0 5%;
    background-color: ${(props) => props.theme.white};
    border-bottom: 1px solid ${(props) => props.theme.light};
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 20px 20px -20px ${(props) => props.theme.medium};
`;
