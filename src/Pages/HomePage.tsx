import React from "react";
import styled from "styled-components";
import PostFeed from "../Components/Post/PostFeed";
// import useScrollToTop from "../util/useScrollToTop";

export default function HomePage() {
    // const { ScrollButton } = useScrollToTop();
    return (
        <Home>
            {/* <ScrollButton /> */}
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
