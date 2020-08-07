import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default () => {
    return (
        <TopBar>
            <Link to="/">pairboard.io</Link>
        </TopBar>
    );
};

const TopBar = styled.div`
    height: 80px;
    width: 100%;
    background-color: ${(props) => props.theme.verydark};
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 5px solid ${(props) => props.theme.verydark};
    border-image: ${(props) =>
        `linear-gradient(140deg, ${props.theme.orange}, ${props.theme.yellow}, ${props.theme.green}, ${props.theme.blue}) 3`};
    > a {
        font-size: 2em;
        font-weight: 100;
        color: ${(props) => props.theme.verylight};
        transition: color 0.25s linear;
        &:hover {
            transition: color 0.25s linear;
            color: ${(props) => props.theme.white};
        }
    }
`;
