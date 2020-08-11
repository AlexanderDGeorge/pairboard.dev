import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default () => {
    return (
        <Header>
            <Link to="/">pairboard.io</Link>
        </Header>
    );
};

const Header = styled.header`
    height: 80px;
    width: 100%;
    background-color: ${(props) => props.theme.verydark};
    border-bottom: 5px solid ${(props) => props.theme.verydark};
    border-image: ${(props) =>
        `linear-gradient(140deg, ${props.theme.orange}, ${props.theme.yellow}, ${props.theme.green}, ${props.theme.blue}) 3`};
    > a {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2em;
        font-weight: 100;
        color: ${(props) => props.theme.verylight};
        transition: all 0.25s linear;
        &:hover {
            transition: all 0.25s linear;
            font-size: 2.01em;
            color: ${(props) => props.theme.white};
        }
    }
`;
