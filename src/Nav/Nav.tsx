import React from "react";
import styled from "styled-components";
import Header from "./Header";
import LinkBar from "./LinkBar";

export default () => {
    return (
        <Nav>
            <Header />
            <LinkBar />
        </Nav>
    );
};

const Nav = styled.header`
    width: 100%;
`;
