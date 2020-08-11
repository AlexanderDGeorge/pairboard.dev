import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default () => {
    return (
        <ProfileNav>
            <Link to="/profile/stats">Stats</Link>
            <Link to="/profile/settings">Settings</Link>
        </ProfileNav>
    );
};

const ProfileNav = styled.div`
    height: 60px;
    width: 100%;
    padding: 0 5%;
    background-color: ${(props) => props.theme.white};
    border-bottom: 1px solid ${(props) => props.theme.light};
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    > a,
    button {
        height: 100%;
        width: 200px;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        color: ${(props) => props.theme.verydark};
        font-weight: 300;
        font-size: 1em;
        outline: none;
        cursor: pointer;
        transition: color 0.2s ease-out;
        &:hover {
            color: ${(props) => props.theme.accent};
            transition: color 0.2s ease-in;
        }
    }
    box-shadow: 0 4px 13px -3px rgba(0, 0, 0, 0.10196);
`;
