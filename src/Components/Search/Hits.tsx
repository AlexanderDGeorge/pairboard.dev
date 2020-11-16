import React from 'react';
import { connectHits } from 'react-instantsearch-dom';
import styled from 'styled-components';

function Hits(props: { hits: any }) {
    return (
        <StyledHits>
            {props.hits.map((hit: any, i: number) => {
                console.log(hit);
                return (
                    <div key={i}>
                        {hit.name}
                    </div>
                )
            })}
        </StyledHits>
    )
}

const StyledHits = styled.div`
    position: absolute;
`;

const CustomHits = connectHits(Hits);

export default CustomHits;