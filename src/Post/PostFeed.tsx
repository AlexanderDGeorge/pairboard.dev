import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoadingBar from "../Components/Animated/LoadingBar";
import { firestore } from "../firebase/firebase";
import { PostSchema } from "../firebase/schema";
import useFirebaseQuery from "../util/useFirebaseQuery";
import PostItem from "./Post";

export default () => {
    const [posts, setPosts] = useState<any>([]);
    const { status, data } = useFirebaseQuery(firestore().collection("posts"));

    // [TODO]: paginate

    useEffect(() => {
        setPosts(data);
    }, [data]);

    if (status === "loading") {
        return <LoadingBar />;
    } else if (posts) {
        return (
            <PostFeed>
                {posts.map((post: PostSchema, i: number) => {
                    console.log(post);
                    return <PostItem post={post} key={i} />;
                })}
            </PostFeed>
        );
    } else {
        return null;
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
