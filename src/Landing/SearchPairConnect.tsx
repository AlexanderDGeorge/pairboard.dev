import React from 'react';
import styled from 'styled-components';

export default function SearchPairConnect() {
    return (
        <StyledSearchPairConnect>
            <div>
                <h1>Search</h1>
                <p>
                    find pairboarding partners and lectures host group sessions
                </p>
            </div>
            <div>
                <h1>Pair</h1>
                <p>
                    work with your partner, group, or lecturer to solve
                    problems, work on code, and develop team skills
                </p>
            </div>
            <div>
                <h1>Connect</h1>
                <p>
                    make connections and expand your network. showcase work and
                    social media profiles
                </p>
            </div>
        </StyledSearchPairConnect>
    );
}

const StyledSearchPairConnect = styled.div`
    position: relative;
    padding: 20% 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 800px) {
        flex-direction: column;
    }
    * {
        color: ${(props) => props.theme.white};
    }
    > div {
        height: 100%;
        min-width: 25%;
        margin: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        > h1 {
            text-align: center;
            margin-bottom: 20px;
        }
        > p {
            text-align: center;
            font-size: 1.3em;
            font-weight: 100;
        }
    }
`;
