import React from "react";
import styled from "styled-components";
import { PostSchema } from "../../firebase/schema";
import useFirebaseQuery from "../../util/useFirebaseQuery";
import LoadingBar from "../Animated/LoadingBar";
import Post from "./Post";

export default function PostLane(props: { name: string; query: any }) {
    const { status, data } = useFirebaseQuery(props.query);

    if (status === "loading") {
        return (
            <StyledPostLane>
                <h1>{props.name}</h1>
                <LoadingBar />
            </StyledPostLane>
        );
    } else if (data?.length) {
        return (
            <StyledPostLane>
                <h1>{props.name}</h1>
                <div>
                    {data.map((post: PostSchema, i: number) => (
                        <Post post={post} key={i} />
                    ))}
                </div>
            </StyledPostLane>
        );
    } else {
        return (
            <StyledPostLane>
                <h1>{props.name}</h1>
                No posts
            </StyledPostLane>
        );
    }
}

const StyledPostLane = styled.div`
    width: 100%;
    > h1 {
        width: 350px;
        margin-bottom: 10px;
        border-bottom: 3px solid ${(props) => props.theme.light};
        font-weight: 500;
    }
    > div {
        width: 100%;
        display: flex;
        overflow-x: scroll;
    }
`;
