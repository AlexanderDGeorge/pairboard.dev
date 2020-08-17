import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default () => {
    return (
        <Header to="/">
            pairboard.io <sup>alpha</sup>
        </Header>
    );
};

const Header = styled(Link)`
    height: 80px;
    width: 100%;
    background-color: ${(props) => props.theme.verydark};
    border-bottom: 5px solid ${(props) => props.theme.verydark};
    border-image: ${(props) =>
        `linear-gradient(140deg, ${props.theme.orange}, ${props.theme.yellow}, ${props.theme.green}, ${props.theme.blue}) 3`};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.4em;
    font-weight: 100;
    color: ${(props) => props.theme.verylight};
    transition: all 0.25s linear;
    text-decoration: none;
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
