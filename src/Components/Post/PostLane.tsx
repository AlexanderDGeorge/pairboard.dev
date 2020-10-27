import React from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { PostSchema } from "../../firebase/schema";
import useFirebaseQuery from "../../util/useFirebaseQuery";
import LoadingBar from "../Animated/LoadingBar";
import Post from "./Post";
import CreatePost from "./CreatePost";

const restName = {
    width: "40%",
    fontSize: "2em",
    color: "rgba(0, 0, 0, 1)",
};
const hoverName = {
    width: "80%",
    fontSize: "3em",
    color: "rgba(0, 0, 0, 0)",
};

export default function PostLane(props: {
    name: string;
    query?: any;
    create?: boolean;
}) {
    const { status, data } = useFirebaseQuery(props.query);

    const [name, setName] = useSpring(() => ({
        width: "40%",
        fontSize: "2em",
        color: "rgba(0, 0, 0, 1)",
    }));

    function AsyncPostLane() {
        if (status === "loading") {
            return <LoadingBar />;
        } else if (data?.length) {
            return (
                <>
                    {data.map((post: PostSchema, i: number) => (
                        <Post post={post} key={i} />
                    ))}
                </>
            );
        } else {
            return <p>no posts</p>;
        }
    }

    return (
        <StyledPostLane
            onMouseEnter={() => setName(hoverName)}
            onMouseLeave={() => setName(restName)}
        >
            <AnimatedH1 style={name}>{props.name}</AnimatedH1>
            <div>{props.create ? <CreatePost /> : <AsyncPostLane />}</div>
        </StyledPostLane>
    );
}

const StyledPostLane = styled.div`
    width: 100%;
    margin: 20px 0;
    > div {
        display: flex;
        overflow-x: scroll;
    }
`;

const AnimatedH1 = styled(animated.h1)`
    margin-bottom: 10px;
    border-bottom: 3px solid ${(props) => props.theme.light};
    font-weight: 500;
    background: linear-gradient(45deg, #825cff, #ff890a 15%);
    -webkit-background-clip: text;
    background-clip: text;
    cursor: pointer;
`;
