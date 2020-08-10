import React from "react";
import styled from "styled-components";
import SearchResult from "../Search/SearchResult";

export default function HomePage() {
    return (
        <HomeContainer>
            <SearchResult
                language="JavaScript"
                difficulty="Medium"
                tag="Arrays"
                score={100}
                user="qn7TzLedgmdzQ1pGgPXjzuhqzEl2"
            />
        </HomeContainer>
    );
}

const HomeContainer = styled.div`
    height: 100%;
    width: 100%;
    padding: 5%;
    background-color: ${(props) => props.theme.white};
    display: flex;
    flex-wrap: wrap;
`;
