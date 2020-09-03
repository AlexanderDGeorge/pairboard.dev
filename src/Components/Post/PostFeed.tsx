import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostItem from "./Post";
import { fetchSessions } from "../../firebase/session";
import { Session } from "../../types/session_types";

export default () => {
    const [posts, setPosts] = useState<any>([]);

    // [TODO]: paginate

    useEffect(() => {
        fetchSessions().then((sessionDocs) => setPosts(sessionDocs));
    }, []);

    return (
        <PostFeed>
            {posts.map((post: Session, i: number) => (
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
