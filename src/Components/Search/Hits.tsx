import React, { useContext, useRef } from 'react';
import { connectHits } from 'react-instantsearch-dom';
import styled from 'styled-components';
import useOnOutsideCLick from '../../util/useOnOutsideClick';
import { SearchContext } from './Search';
import UserHit from './UserHit';

function Hits(props: { hits: object[] }) {
    const { setFocus, focused } = useContext(SearchContext)!;
    const hitsRef = useRef(null);

    useOnOutsideCLick(hitsRef, () => setFocus(false));
    
    if (focused) {
        console.log(props.hits)
        return (
            <StyledHitsBG>
                <StyledHits ref={hitsRef}>
                    {props.hits.map((hit: any, i: number) => {
                        return (
                            <UserHit key={i} hit={hit}/>
                            )
                        })}
                </StyledHits>
            </StyledHitsBG>
        )
    } else {
        return null;
    }

}

const StyledHitsBG = styled.div`
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
`;

const StyledHits = styled.div`
    height: 80%;
    width: 80%;
    border-radius: 5px;
    padding: 2%;
    display: flex;
    flex-direction: column;
`;

const CustomHits = connectHits(Hits);

export default CustomHits;