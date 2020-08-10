import React from "react";
import styled from "styled-components";
import Header from "./Header";
import LinkBar from "./LinkBar";
import SearchBar from "../Search/SearchBar";

export default () => {
    return (
        <Nav>
            <Header />
            <LinkBar />
            <SearchBar />
        </Nav>
    );
};

const Nav = styled.header`
    width: 100%;
`;
