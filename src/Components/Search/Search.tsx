import React, { createContext, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import SearchBox from './SearchBox';
import Hits from './Hits';

interface ISearch {
    focused: boolean;
    setFocus: Function;
}

const searchClient = algoliasearch('IQDWF0CVXQ', 'c47f48c53f21df6fd24f2eb5ab1c7356');

export const SearchContext = createContext<ISearch | undefined>(undefined)

export default function Search() {
    const [focused, setFocus] = useState(false);

    return (
        <SearchContext.Provider value={{focused, setFocus}}>
                <InstantSearch searchClient={searchClient} indexName="users">
                    <SearchBox />
                    <Hits />
                </InstantSearch>
        </SearchContext.Provider>
    )
}