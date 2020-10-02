import React from "react";
import styled from "styled-components";
import PostBar from "../Components/Post/PostBar";
import PostFeed from "../Components/Post/PostFeed";

export default () => {
    return (
        <Home>
            <PostBar />
            <PostFeed />
        </Home>
    );
};

const Home = styled.div`
    min-height: 100%;
    width: 100%;
    padding: 2% 5%;
    display: flex;
    @media screen and (max-width: 600px) {
        flex-direction: column;
    }
`;
