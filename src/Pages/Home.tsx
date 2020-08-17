import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import SearchResult from "../Search/SearchResult";
import Nav from "../Nav/Nav";
import SearchBar from "../Search/SearchBar";
import { fetchPaginatedSection, Search } from "../firebase/search";
import { SearchContext } from "../Application";

export default () => {
    const currentSearch = useContext(SearchContext);
    const [searchResults, setSearchResults] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState<any>(undefined);
    const limit = 4;

    useEffect(() => {
        console.log(currentSearch);
        (async () => {
            const fetchedPage = await fetchPaginatedSection(
                limit,
                currentSearch
            );
            setSearchResults(fetchedPage);
        })();
    }, [currentSearch]);

    useEffect(() => {
        async function handleScroll(e: any) {
            const position = e.target.scrollTop;
            const height = e.target.scrollHeight - e.target.clientHeight;
            console.log(position);
            console.log(height);
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    console.log(searchResults);

    return (
        <Home>
            <Nav />
            <SearchBar />
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
