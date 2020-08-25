import React from "react";
import styled from "styled-components";
import LinkBar from "../Nav/LinkBar";
import PostBar from "../PostBar/PostBar";

export default () => {
    return (
        <Home>
            <LinkBar />
            <PostBar />
        </Home>
    );
};

const Home = styled.div`
    min-height: 100%;
    height: 100%;
    width: 100%;
`;
