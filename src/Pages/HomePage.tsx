import React from "react";
import styled from "styled-components";
import PostFeed from "../Components/Post/PostFeed";
// import TestPage from "./TestPage";

export default function HomePage() {
    return (
        <Home>
            {/* <TestPage /> */}
            <PostFeed />
        </Home>
    );
}

const Home = styled.div`
    min-height: 100%;
    width: 100%;
    padding: 100px 10%;
    display: flex;
    flex-direction: column;
`;
