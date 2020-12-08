import React, { createContext, useRef, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { Index, InstantSearch } from 'react-instantsearch-dom';
import SearchBox from './SearchBox';
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
                {focused ? 
                    <InstantSearch searchClient={searchClient} indexName="users">
                        <SearchBox />
                        <Index indexName='users'>
                            <UserHits />
                        </Index>
                        <Index indexName='posts'>
                            <PostHits />
                        </Index>
                    </InstantSearch> :
                    null
                }
            </StyledSearchWrapper>
        </SearchContext.Provider>
    )
}

const StyledSearchWrapper = styled.div`
    z-index: 2;
    height: 40px;
    width: 200px;
    background-color: ${props => props.theme.accent};
    border-radius: 10px;
    box-shadow: 0 0 20px ${props => props.theme.verydark};
`;