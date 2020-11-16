import React, { createContext, useRef, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import SearchBox from './SearchBox';
import Hits from './Hits';
import styled from 'styled-components';
import useOnOutsideCLick from '../../util/useOnOutsideClick';

interface ISearch {
    focused: boolean;
    setFocus: Function;
}

const searchClient = algoliasearch('IQDWF0CVXQ', 'c47f48c53f21df6fd24f2eb5ab1c7356');

export const SearchContext = createContext<ISearch | undefined>(undefined)

export default function Search() {
    const [focused, setFocus] = useState(false);
    const searchRef = useRef(null);

    useOnOutsideCLick(searchRef, () => setFocus(false));

    return (
        <SearchContext.Provider value={{ focused, setFocus }}>
            <StyledSearchWrapper ref={searchRef}>
                <InstantSearch searchClient={searchClient} indexName="users">
                    <SearchBox />
                    <Hits />
                </InstantSearch>
            </StyledSearchWrapper>
        </SearchContext.Provider>
    )
}

const StyledSearchWrapper = styled.div`
    height: fit-content;
    margin-top: 20px;
    background-color: ${props => props.theme.dark};
    border-radius: 5px;
    box-shadow: 0 0 20px ${props => props.theme.verydark};
`;