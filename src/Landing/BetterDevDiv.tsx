import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function BetterDevDiv() {
    return (
        <StyledBetterDevDiv>
            <h1>Become a Better Developer</h1>
            <Link to="/login">login</Link>
            <Link to="/signup">sign up for free</Link>
        </StyledBetterDevDiv>
    );
}

const StyledBetterDevDiv = styled.div`
    min-height: 95%;
    padding: 5% 15%;
    background-image: ${(props) =>
        `linear-gradient(40deg, ${props.theme.green}, ${props.theme.blue}, ${props.theme.purple})`};
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    @media screen and (max-width: 600px) {
        padding: 5%;
    }
    > h1 {
        position: relative;
        min-height: 200px;
        width: 100%;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${(props) => props.theme.white};
        background-color: transparent;
        font-size: 4em;
        font-weight: 500;
        ::before {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1;
            box-shadow: inset 0 0 20px 0 ${(props) => props.theme.verydark};
        }
    }
    > a {
        height: 80px;
        width: 300px;
        margin: 20px;
        border-radius: 20px;
        font-size: 1.5em;
        font-weight: 500;
        text-decoration: none;
        outline: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 2px 4px 15px -4px ${(props) => props.theme.dark};
        transition: all 0.5s linear;
        color: ${props => props.theme.white};
        background-color: ${(props) => props.theme.dark};
        &:hover {
            transition: all 0.5s linear;
            box-shadow: 2px 4px 20px 4px ${(props) => props.theme.dark};
        }
    }
    > a:last-of-type {
        color: ${props => props.theme.white};
        box-shadow: 2px 4px 15px -4px ${(props) => props.theme.green};
        background-image: ${(props) =>
            `linear-gradient(80deg, ${props.theme.green}, ${props.theme.blue} 140%)`};        
        &:hover {
            box-shadow: 2px 4px 20px 4px ${(props) => props.theme.green};
        }
    }
`;
