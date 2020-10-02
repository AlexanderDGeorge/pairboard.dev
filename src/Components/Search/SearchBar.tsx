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
    console.log(results);

    return (
        <SearchBar>
            <StyledField>
                <label htmlFor="">username</label>
                <input type="text" value={search} onChange={handleInput} />
                <MdSearch />
            </StyledField>
        </SearchBar>
    );
};

const SearchBar = styled.div`
    height: 100px;
    width: 400px;
    padding: 10px;
    svg {
        cursor: pointer;
    }
`;
