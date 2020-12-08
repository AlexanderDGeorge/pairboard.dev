import React, { createContext, useRef, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { Index, InstantSearch } from 'react-instantsearch-dom';
import SearchInput from './SearchInput';
import UserHits from './UserHits';
import PostHits from './PostHits';
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
                    <SearchInput />
                    <HitsWrapper>
                        <Index indexName='users'>
                            <UserHits />
                        </Index>
                        <Index indexName='posts'>
                            <PostHits />
                        </Index>
                    </HitsWrapper>
                </InstantSearch> 
            </StyledSearchWrapper>
        </SearchContext.Provider>
    )
}

const StyledSearchWrapper = styled.div`
    position: relative;
    z-index: 2;
    height: 40px;
    width: 300px;
    background-color: ${props => props.theme.dark};
    border-radius: 5px;
    box-shadow: 0 0 20px ${props => props.theme.verydark};
`;

const HitsWrapper = styled.div`
    position: absolute;
    border-radius: 10px;
    background-color: ${props => props.theme.dark};
`;