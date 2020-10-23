import React from "react";
import styled from "styled-components";
import CreatePost from "../Components/Post/CreatePost";
import PostFeed from "../Components/Post/PostFeed";

export default () => {
    return (
        <Home>
            <CreatePost />
            <PostFeed />
        </Home>
    );
};

const Home = styled.div`
    min-height: 100%;
    width: 100%;
    padding: 2% 10%;
    display: flex;
    flex-direction: column;
`;
