import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default () => {
    return (
        <MiddleDiv>
            <h1>Become a Better Developer</h1>
            <Link to="/login">login</Link>
            <Link to="/signup">sign up for free</Link>
        </MiddleDiv>
    );
};

const MiddleDiv = styled.div`
    min-height: 70%;
    padding: 2% 10%;
    background-image: ${(props) =>
        `linear-gradient(130deg, ${props.theme.green}, ${props.theme.blue}, ${props.theme.purple})`};
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
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
        font-size: 1.5em;
        text-decoration: none;
        outline: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px -4px ${(props) => props.theme.black};
        transition: all 0.5s linear;
        &:hover {
            transition: all 0.5s linear;
            box-shadow: 0 4px 20px 0px ${(props) => props.theme.black};
        }
    }
`;
