import React from "react";
import styled from "styled-components";
import SearchResult from "../Search/SearchResult";
import SearchBar from "../Search/SearchBar";
import useSearch from "../Search/useSearch";
import LinkBar from "../Nav/LinkBar";

export default () => {
    const { searchResults, triggerSearch } = useSearch();

    console.log(searchResults);
    if (!searchResults) {
        return (
            <Home>
                <LinkBar />
                <SearchBar triggerSearch={triggerSearch} />
                <EmptySearch>
                    <h1>Once you post, similar posts will be shown here!</h1>
                </EmptySearch>
            </Home>
        );
    } else if (searchResults.length) {
        return (
            <Home>
                <LinkBar />
                <SearchBar triggerSearch={triggerSearch} />
                <SearchResults>
                    {searchResults.map((searchResult: any, i: number) => (
                        <SearchResult result={searchResult} key={i} />
                    ))}
                </SearchResults>
            </Home>
        );
    } else {
        return (
            <Home>
                <LinkBar />
                <SearchBar triggerSearch={triggerSearch} />
                <EmptySearch>
                    <h1>No results found :(</h1>
                </EmptySearch>
            </Home>
        );
    }
};

const Home = styled.div`
    min-height: 100%;
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

const EmptySearch = styled.div`
    height: 50%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    * {
        color: ${(props) => props.theme.medium};
    }
`;
