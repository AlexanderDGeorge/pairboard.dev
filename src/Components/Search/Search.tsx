import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import styled from 'styled-components';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch('IQDWF0CVXQ', 'c47f48c53f21df6fd24f2eb5ab1c7356');

export default function Search() {
    return (
        <InstantSearch searchClient={searchClient} indexName="customers">
            <SearchBox />
            <Hits hitComponent={Hit} />
        </InstantSearch>
    )
}

function Hit(props: {hit: any}) {
    return (
        <p>{props.hit}</p>
    )
}

const StyledSearch = styled.div`
    position: relative;
    height: 40px;
    width: 400px;
    border-radius: 10px;
    background-color: ${props => props.theme.dark};
    color: ${props => props.theme.white};
    > input {
        height: 100%;
        width: 100%;
        border-radius: 10px;
        padding: 10px;
        background: inherit;
        color: inherit;
        outline: none;
    }
`;