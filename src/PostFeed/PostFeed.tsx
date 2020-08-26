import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchPosts, Post } from "../firebase/post";
import PostItem from "./Post";

export default () => {
    const [posts, setPosts] = useState<any>([]);

    // [TODO]: paginate

    useEffect(() => {
        fetchPosts().then((postDocs) => setPosts(postDocs));
    }, []);

    return (
        <PostFeed>
            {posts.map((post: Post, i: number) => (
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
