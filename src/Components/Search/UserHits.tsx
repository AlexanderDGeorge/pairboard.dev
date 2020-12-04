import React, { useContext } from 'react';
import { connectHits } from 'react-instantsearch-dom';
import styled from 'styled-components';
import { SearchContext } from './Search';
import MediumUserCard from '../User/MediumUserCard';

function UserHits(props: { hits: object[] }) {
    const { focused } = useContext(SearchContext)!;

    
    if (focused) {
        return (
            <StyledHits>
                {props.hits.map((hit: any, i: number) => {
                    return (
                        <MediumUserCard key={i} user={hit}/>
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

const CustomHits = connectHits(UserHits);

export default CustomHits;