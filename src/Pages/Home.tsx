import React from "react";
import styled from "styled-components";
import LinkBar from "../Nav/LinkBar";
import PostBar from "../PostBar/PostBar";
import PostFeed from "../PostFeed/PostFeed";

export default () => {
    return (
        <Home>
            <LinkBar />
            <PostBar />
            <PostFeed />
        </Home>
    );
};

const Home = styled.div`
    min-height: 100%;
    height: 100%;
    width: 100%;
`;
