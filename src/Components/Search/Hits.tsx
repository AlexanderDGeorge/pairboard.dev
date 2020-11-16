import React, { useContext } from 'react';
import { connectHits } from 'react-instantsearch-dom';
import styled from 'styled-components';
import { SearchContext } from './Search';
import UserHit from './UserHit';

function Hits(props: { hits: object[] }) {
    const { focused } = useContext(SearchContext)!;

    
    if (focused) {
        console.log(props.hits)
        return (
            <StyledHits>
                {props.hits.map((hit: any, i: number) => {
                    return (
                        <UserHit key={i} hit={hit}/>
                        )
                    })}
            </StyledHits>
        )
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

const CustomHits = connectHits(Hits);

export default CustomHits;