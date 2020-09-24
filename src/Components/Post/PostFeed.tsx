import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchPosts } from "../../firebase/post";
import { PostSchema } from "../../firebase/schema";
import PostItem from "./Post";

export default () => {
    const [posts, setPosts] = useState<any>([]);

    // [TODO]: paginate

    useEffect(() => {
        // memory leak here
        (async () => {
            const sessionDocs = await fetchPosts();
            setPosts(sessionDocs);
        })();
    }, []);

    return (
        <PostFeed>
            {posts.map((post: PostSchema, i: number) => (
                <PostItem post={post} key={i} />
            ))}
        </PostFeed>
    );
};

const PostFeed = styled.div`
    min-height: 100%;
    width: 100%;
    padding: 2% 5%;
    display: flex;
    flex-wrap: wrap;
`;
