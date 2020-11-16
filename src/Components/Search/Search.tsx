import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import styled from 'styled-components';
import { InstantSearch } from 'react-instantsearch-dom';
import SearchBox from './SearchBox';
import Hits from './Hits';

const searchClient = algoliasearch('IQDWF0CVXQ', 'c47f48c53f21df6fd24f2eb5ab1c7356');

export default function Search() {
    return (
        <StyledSearchDiv>
            <InstantSearch searchClient={searchClient} indexName="users">
                <SearchBox />
                <Hits />
            </InstantSearch>
        </StyledSearchDiv>
    )
}

const StyledSearchDiv = styled.div`
    position: relative;
    background-color: transparent;
`;