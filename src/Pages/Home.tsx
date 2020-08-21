import React from "react";
import styled from "styled-components";
import SearchResult from "../Search/SearchResult";
import Nav from "../Nav/Nav";
import SearchBar from "../Search/SearchBar";
import useSearch from "../Search/useSearch";
import useSearchState from "../Search/useSearchState";

export default () => {
    const [searchParams, setSearchParams] = useSearchState();
    const { searchResults, triggerSearch } = useSearch(searchParams);

    console.log(searchResults);

    return (
        <Home>
            <Nav />
            <SearchBar
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                triggerSearch={triggerSearch}
            />
            <SearchResults>
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
