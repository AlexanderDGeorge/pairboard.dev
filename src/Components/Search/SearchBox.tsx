import React, { useContext } from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import styled from 'styled-components';
import { SearchContext } from './Search';

function SearchBox(props: { currentRefinement: string, refine: Function }) {
    const { currentRefinement, refine } = props;
    const { setFocus } = useContext(SearchContext)!;

    return (
        <StyledSearchBox>
            <input
                onClick={() => setFocus(true)}
                onFocus={() => setFocus(true)}
                type="search"
                value={currentRefinement}
                onChange={event => refine(event.currentTarget.value)}
                placeholder='Search for users, posts...'
            />
        </StyledSearchBox>
    )
}

const StyledSearchBox = styled.div`
    z-index: 2;
    height: 40px;
    width: 400px;
    border-radius: 10px;
    padding: 5px;
    background-color: ${props => props.theme.dark};
    color: ${props => props.theme.light};
    overflow: hidden;
    > input {
        height: 100%;
        width: 100%;
        background-color: transparent;
        color: ${props => props.theme.light};
        outline: none;
    }
`;

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;