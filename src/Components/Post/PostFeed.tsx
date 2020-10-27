import React from "react";
import styled from "styled-components";
import PostLane from "./PostLane";
import { firestore } from "../../firebase/firebase";

export default function PostFeed() {
    const postsQuery = firestore().collection("posts");

    return (
        <StyledPostFeed>
            <PostLane name="Create a Post" create={true} />
            <PostLane name="All Posts" query={postsQuery} />
            <PostLane
                name="JavaScript Only"
                query={postsQuery.where("language", "==", "JavaScript")}
            />
        </StyledPostFeed>
    );
}

const StyledPostFeed = styled.div`
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;
