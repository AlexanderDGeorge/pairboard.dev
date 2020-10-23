import React from "react";
import styled from "styled-components";

export default () => {
    return (
        <Footer>
            <div>
                <h3>External Links</h3>
                <a href="https://github.com/AlexanderDGeorge/pairboard.dev">
                    Github
                </a>
                <a href="https://alexandergeorge.dev/">Portfolio</a>
            </div>
            <div>
                <h3>Support</h3>
            </div>
            <section>
                &copy; 2020 | Alexander George. All rights reserved.
            </section>
        </Footer>
    );
};

const Footer = styled.footer`
    position: relative;
    height: 200px;
    width: 100%;
    padding: 2% 10%;
    background-color: ${(props) => props.theme.verydark};
    border-top: 5px solid ${(props) => props.theme.verydark};
    border-image: ${(props) =>
        `linear-gradient(140deg, ${props.theme.orange}, ${props.theme.yellow}, ${props.theme.green}, ${props.theme.blue}) 3`};
    display: flex;
    flex-wrap: wrap;
    * {
        background-color: transparent;
    }
    > div {
        min-width: 300px;
        display: flex;
        flex-direction: column;
    }
    > section {
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: ${(props) => props.theme.accent};
        font-size: 0.8em;
    }
    h3 {
        margin-bottom: 15px;
        color: ${(props) => props.theme.accent};
    }
    a {
        margin-bottom: 10px;
        background-color: transparent;
        color: ${(props) => props.theme.light};
        font-size: 1em;
        text-decoration: none;
        &:hover {
            color: ${(props) => props.theme.white};
        }
    }
`;
