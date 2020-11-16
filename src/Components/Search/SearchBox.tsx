import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import styled from 'styled-components';

function SearchBox(props: { currentRefinement: string, refine: Function }) {
    const { currentRefinement, refine } = props;

    return (
        <StyledSearchBox>
            <input
                type="search"
                value={currentRefinement}
                onChange={event => refine(event.currentTarget.value)}
                placeholder='Search for users, posts...'
            />
        </StyledSearchBox>
    )
}

const StyledSearchBox = styled.div`
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