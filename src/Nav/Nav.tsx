import React from "react";
import styled from "styled-components";
import TopBar from "./Headers";
import LinkBar from "./LinkBar";
import SearchBar from "./SearchBar";

export default () => {
    return (
        <Nav>
            <TopBar />
            <LinkBar />
            <SearchBar />
        </Nav>
    );
};

const Nav = styled.header`
    width: 100%;
`;
