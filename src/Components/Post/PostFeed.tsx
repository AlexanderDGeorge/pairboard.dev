import React from "react";
import styled from "styled-components";
import PostLane from "./PostLane";
import { firestore } from "../../firebase/firebase";

export default () => {
    return (
        <PostFeed>
            <PostLane
                name="All Posts"
                query={firestore().collection("posts")}
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
