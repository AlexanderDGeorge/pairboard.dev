import React from "react";
import styled from "styled-components";

export default function HomePage() {
    return <HomeContainer>Home Page</HomeContainer>;
}

const HomeContainer = styled.div`
    height: 100%;
    width: 100%;
    padding: 5%;
    background-color: ${(props) => props.theme.white};
    display: flex;
    flex-wrap: wrap;
`;
