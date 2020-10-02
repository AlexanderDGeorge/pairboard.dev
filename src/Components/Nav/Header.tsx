import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../Application";
import ProfileLink from "./ProfileLink";

export default () => {
    const history = useHistory();
    const user = useContext(UserContext);

    function handleGoHome() {
        const path = history.location.pathname;
        if (path === "/") return;
        history.replace("/");
    }

    return (
        <Header>
            <HomeLink onClick={handleGoHome}>
                pairboard.dev <sup>alpha</sup>
            </HomeLink>
            {user ? <ProfileLink user={user} /> : null}
        </Header>
    );
};

const Header = styled.header`
    height: 80px;
    width: 100%;
    padding: 0 5%;
    background-color: ${(props) => props.theme.verydark};
    border-bottom: 5px solid ${(props) => props.theme.verydark};
    border-image: ${(props) =>
        `linear-gradient(140deg, ${props.theme.orange}, ${props.theme.yellow}, ${props.theme.green}, ${props.theme.blue}) 3`};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const HomeLink = styled.button`
    height: 80px;
    background-color: transparent;
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.4em;
    font-weight: 100;
    color: ${(props) => props.theme.verylight};
    transition: all 0.25s linear;
    text-decoration: none;
    outline: none;
    &:hover {
        transition: all 0.25s linear;
        font-size: 2.41em;
        color: ${(props) => props.theme.white};
    }
    > sup {
        background-color: transparent;
        color: ${(props) => props.theme.light};
        font-size: 0.5em;
    }
`;
