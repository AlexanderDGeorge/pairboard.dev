import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { signOut } from "../firebase/auth";

export default () => {
    return (
        <LinkBar>
            <a href="https://github.com/AlexanderDGeorge/PairBoarding">
                Github
            </a>
            <Link to={`/profile/stats`}>Profile</Link>
            <button onClick={signOut}>Log Out</button>
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
`;
