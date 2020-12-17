import React, { useContext } from 'react';
import styled from 'styled-components';
import { SearchContext } from './SearchBox';
import Post from '../../Posts/Components/Post';
import { connectHits } from 'react-instantsearch-dom';

function PostHits(props: { hits: object[] }) {
    const { focused } = useContext(SearchContext)!;

    if (focused) {
        return (
            <StyledHits>
                {props.hits?.map((hit: any, i: number) => {
                    return <Post key={i} post={hit} />;
                })}
            </StyledHits>
        );
    } else {
        return null;
    }
}

const StyledHits = styled.div`
    float: bottom;
    height: 80%;
    width: 100%;
    border-radius: 5px;
    padding: 2%;
    background: transparent;
    display: flex;
    flex-direction: column;
`;

const CustomHits = connectHits(PostHits);

export default CustomHits;
