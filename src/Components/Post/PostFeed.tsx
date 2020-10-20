import React from "react";
import styled from "styled-components";
import PostLane from "./PostLane";
import { firestore } from "../../firebase/firebase";

export default () => {
    const postsQuery = firestore().collection("posts");

    return (
        <PostFeed>
            <PostLane name="All Posts" query={postsQuery} />
            <PostLane
                name="JavaScript"
                query={postsQuery.where("language", "==", "JavaScript")}
            />
        </PostFeed>
    );
};

const PostFeed = styled.div`
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;
