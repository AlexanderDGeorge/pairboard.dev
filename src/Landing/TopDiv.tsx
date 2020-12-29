import React from 'react';
import styled from 'styled-components';

export default function TopDiv() {
    return (
        <StyledTopDiv>
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
        </StyledTopDiv>
    );
}

const StyledTopDiv = styled.div`
    position: relative;
    height: 105%;
    padding: 2% 10%;
    /* background-color: ${(props) => props.theme.white}; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 800px) {
        flex-direction: column;
    }
    /* ::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
        box-shadow: 3px 8px 20px 0px ${(props) => props.theme.verydark};
    } */
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
