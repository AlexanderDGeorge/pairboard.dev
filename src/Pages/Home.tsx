import React from "react";
import styled from "styled-components";
import Card from "../Components/Card";

export default function HomePage() {
    function handleSearch() {}

    return (
        <HomeContainer>
            <Card label="Search for a Pair" handleClick={handleSearch} />
            <Card label="Set Availability" handleClick={handleSearch} />
        </HomeContainer>
    );
}

const HomeContainer = styled.div`
    height: 100%;
    width: 100%;
    padding: 0 5%;
    background-color: ${(props) => props.theme.light};
    display: flex;
    flex-wrap: wrap;
`;
