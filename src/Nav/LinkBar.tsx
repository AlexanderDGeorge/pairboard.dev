import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default () => {
    return (
        <LinkBar>
            <Link to="/">Find a Pair</Link>
            <a href="https://github.com/AlexanderDGeorge/PairBoarding">
                Github
            </a>
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
    > a {
        height: 100%;
        width: 200px;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${(props) => props.theme.verydark};
        font-weight: 300;
        border-bottom: 3px solid transparent;
        transition: all 0.25s ease-out;
        &:hover {
            color: ${(props) => props.theme.black};
            border-bottom: 3px solid ${(props) => props.theme.black};
            transition: all 0.5s ease-in;
        }
    }
`;
