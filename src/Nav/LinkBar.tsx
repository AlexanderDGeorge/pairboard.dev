import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { signOut } from "../firebase/auth";
import { UserContext } from "../Application";

export default () => {
    const currentUser = useContext(UserContext);

    return (
        <LinkBar>
            <Link to="/">Home</Link>
            <Link to="/profile/stats">Profile</Link>
            <Link to="/pairs">Pairs</Link>
            <button onClick={async () => await signOut(currentUser)}>
                Log Out
            </button>
        </LinkBar>
    );
};

const LinkBar = styled.div`
    height: 60px;
    width: 100%;
    padding: 0 5%;
    background-color: ${(props) => props.theme.white};
    border-bottom: 1px solid ${(props) => props.theme.light};
    display: flex;
    align-items: center;
    justify-content: space-between;
    > a,
    button {
        height: 100%;
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
`;
