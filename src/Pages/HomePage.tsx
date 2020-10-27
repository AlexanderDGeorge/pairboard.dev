import React from "react";
import styled from "styled-components";
import PostFeed from "../Components/Post/PostFeed";

export default function HomePage() {
    return (
        <Home>
            <PostFeed />
        </Home>
    );
}

const Home = styled.div`
    min-height: 100%;
    width: 100%;
    padding: 2% 10%;
    display: flex;
    flex-direction: column;
`;
