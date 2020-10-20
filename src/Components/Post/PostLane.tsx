import React from "react";
import styled from "styled-components";
import { PostSchema } from "../../firebase/schema";
import useFirebaseQuery from "../../util/useFirebaseQuery";
import LoadingBar from "../Animated/LoadingBar";
import Post from "./Post";

export default (props: { name: string; query: any }) => {
    const { status, data } = useFirebaseQuery(props.query);

    if (status === "loading") {
        return (
            <PostLane>
                <h1>{props.name}</h1>
                <LoadingBar />
            </PostLane>
        );
    } else if (data?.length) {
        return (
            <PostLane>
                <h1>{props.name}</h1>
                <div>
                    {data.map((post: PostSchema, i: number) => (
                        <Post post={post} key={i} />
                    ))}
                </div>
            </PostLane>
        );
    } else {
        return (
            <PostLane>
                <h1>{props.name}</h1>
                No posts
            </PostLane>
        );
    }
};

const PostLane = styled.div`
    width: 100%;
    > h1 {
        width: 350px;
        margin-bottom: 10px;
        border-bottom: 1px solid ${(props) => props.theme.light};
        font-weight: 500;
    }
    > div {
        width: 100%;
        display: flex;
        overflow-x: scroll;
    }
`;
