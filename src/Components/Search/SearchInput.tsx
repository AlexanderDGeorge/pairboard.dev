import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import styled from 'styled-components';

function SearchInput(props: { currentRefinement: string; refine: Function }) {
    const { currentRefinement, refine } = props;

    return (
        <StyledSearchInput
            type="search"
            value={currentRefinement}
            onChange={(event) => refine(event.currentTarget.value)}
            placeholder="Search..."
        />
    );
}

const StyledSearchInput = styled.input`
    width: 100%;
    border-radius: 10px;
    padding: 20px;
    background-color: ${(props) => props.theme.verydark};
    color: ${(props) => props.theme.white};
    font-size: 2em;
    overflow: hidden;
    outline: none;
`;

const CustomSearchInput = connectSearchBox(SearchInput);

export default CustomSearchInput;
