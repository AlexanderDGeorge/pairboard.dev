import React from "react";
import styled from "styled-components";
import LoadingBar from "../../Components/Animated/LoadingBar";
import { firestore } from "../../firebase/firebase";
import { PostSchema } from "../../firebase/schema";
import useFirebaseQuery from "../../util/useFirebaseQuery";
import PostItem from "./Post";

export default () => {
    const { status, data } = useFirebaseQuery(firestore().collection("posts"));

    // [TODO]: paginate

    if (status === "loading") {
        return <LoadingBar />;
    } else if (data?.length) {
        return (
            <PostFeed>
                {data.map((post: PostSchema, i: number) => (
                    <PostItem post={post} key={i} />
                ))}
            </PostFeed>
        );
    } else {
        return (
            <PostFeed>
                <h2>No posts found</h2>
            </PostFeed>
        );
    }
};

const PostFeed = styled.div`
    min-height: 100%;
    width: 100%;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 600px) {
        width: 100%;
        padding-left: 0;
    }
`;
