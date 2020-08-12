import React from "react";
import styled from "styled-components";

export default () => {
    return (
        <Footer>
            <a href="https://github.com/AlexanderDGeorge/pairboard.io">
                Github
            </a>
            <a href="https://alexandergeorge.dev/">Portfolio</a>
        </Footer>
    );
};

const Footer = styled.footer`
    height: 200px;
    width: 100%;
    padding: 2% 5%;
    background-color: ${(props) => props.theme.verydark};
    border-top: 5px solid ${(props) => props.theme.verydark};
    border-image: ${(props) =>
        `linear-gradient(140deg, ${props.theme.orange}, ${props.theme.yellow}, ${props.theme.green}, ${props.theme.blue}) 3`};
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    > a {
        background-color: transparent;
        color: ${(props) => props.theme.light};
        font-size: 1em;
        text-decoration: none;
        &:hover {
            color: ${(props) => props.theme.white};
        }
    }
`;
