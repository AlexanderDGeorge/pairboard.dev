import React, { useState } from "react";
import styled from "styled-components";
import { StyledField } from "../../styled-components/formStyles";
import { MdSearch } from "react-icons/md";
import { searchForUsername } from "../../firebase/user";

export default () => {
    const [results, setResults] = useState<any>([]);
    const [search, setSearch] = useState("");

    async function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
        const result = await searchForUsername(e.target.value);
        setResults(result);
    }

    return (
        <SearchBar>
            <StyledField>
                <label htmlFor="">username</label>
                <input type="text" value={search} onChange={handleInput} />
                <MdSearch />
            </StyledField>
            <SearchResults>
                {results.map((result: any, i: number) => (
                    <SearchResult key={i}>{result.username}</SearchResult>
                ))}
            </SearchResults>
        </SearchBar>
    );
};

const SearchBar = styled.div`
    position: relative;
    height: 100px;
    width: 400px;
    svg {
        cursor: pointer;
    }
`;

const SearchResults = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
`;

const SearchResult = styled.div`
    height: 25px;
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 1px solid ${(props) => props.theme.verylight};
`;
