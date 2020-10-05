import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PostSchema } from "../../firebase/schema";

export default (props: { post: PostSchema }) => {
    const {
        active,
        createdAt,
        difficulty,
        host,
        language,
        maxCapacity,
        participants,
    } = props.post;

    return (
        <PostDetails>
            <PostLine>
                <p>active</p>
                <p>{active ? "true" : "false"}</p>
            </PostLine>
            <PostLine>
                <p>created</p>
                <p>{new Date(createdAt).toLocaleDateString()}</p>
            </PostLine>
            <PostLine>
                <p>difficulty</p>
                <p>{difficulty}</p>
            </PostLine>
            <PostLine>
                <p>host</p>
                <Link to={`/user/${host.username}`}>{host.username}</Link>
            </PostLine>
            <PostLine>
                <p>language</p>
                <p>{language}</p>
            </PostLine>
            <PostLine>
                <p>maxCapacity</p>
                <p>{maxCapacity}</p>
            </PostLine>
            <PostLine>
                <p>participants</p>
                <p>{participants.length}</p>
            </PostLine>
        </PostDetails>
    );
};

const PostDetails = styled.div`
    max-height: 100;
    width: 100%;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`;

const PostLine = styled.div`
    max-width: 300px;
    padding-bottom: 5px;
    display: flex;
    justify-content: space-between;
    > a {
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`;
