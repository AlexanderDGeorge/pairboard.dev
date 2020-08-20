import React, { useRef } from "react";
import styled from "styled-components";
import SearchResult from "../Search/SearchResult";
import Nav from "../Nav/Nav";
import SearchBar from "../Search/SearchBar";

export default () => {
    const searchResults: Array<any> = [];
    const resultsRef = useRef(null);

    return (
        <Home>
            <Nav />
            <SearchBar />
            <SearchResults ref={resultsRef}>
                {searchResults.map((searchResult: any, i: number) => (
                    <SearchResult result={searchResult} key={i} />
                ))}
            </SearchResults>
        </Home>
    );
};

const Home = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${(props) => props.theme.white};
`;

const SearchResults = styled.div`
    width: 100%;
    padding: 5%;
    display: flex;
    flex-wrap: wrap;
    *:nth-of-type(odd) {
        margin-right: 10px;
    }
`;
