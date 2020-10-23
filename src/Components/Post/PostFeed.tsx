import React from "react";
import styled from "styled-components";
import PostLane from "./PostLane";
import { firestore } from "../../firebase/firebase";

export default function PostFeed() {
    const postsQuery = firestore().collection("posts");

    return (
        <StyledPostFeed>
            <PostLane name="All Posts" query={postsQuery} />
        </StyledPostFeed>
    );
}

const StyledPostFeed = styled.div`
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;
