import React from "react";
import styled from "styled-components";
import { Post } from "../firebase/post";
import { Link } from "react-router-dom";

export default (props: { post: Post }) => {
    const {
        username,
        userScore,
        userPhotoURL,
        createdAt,
        language,
        difficulty,
        tags,
        description,
    } = props.post;

    return (
        <StyledPost>
            <PostHeader>
                <img src={userPhotoURL} alt="" />
                <Link to={`/user/${username}`}>
                    {username} | {userScore}
                </Link>
                <h4>{language}</h4>
            </PostHeader>
            <PostDescription>{description}</PostDescription>
            <PostInfo>
                <p>{difficulty} | </p>
                {tags.map((tag, i: number) => (
                    <p key={i}> {tag} | </p>
                ))}
            </PostInfo>
        </StyledPost>
    );
};

const StyledPost = styled.div`
    height: 200px;
    width: 300px;
    border: 1px solid ${(props) => props.theme.verydark};
    padding: 2%;
    display: flex;
    flex-direction: column;
    transition: all linear 0.2s;
    &:hover {
        transition: all linear 0.2s;
        border: 1px solid ${(props) => props.theme.accent};
        box-shadow: 0 0 20px -8px ${(props) => props.theme.verydark};
    }
`;

const PostHeader = styled.div`
    height: 50px;
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    > img {
        height: 100%;
        width: auto;
        margin-right: 10px;
    }
    > a {
        width: 200px;
        font-size: 1em;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
    > h4 {
        font-weight: 500;
    }
`;

const PostDescription = styled.div`
    height: 100px;
    width: 100%;
    margin-bottom: 10px;
    color: ${(props) => props.theme.medium};
`;

const PostInfo = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    > p {
        margin-right: 5px;
    }
`;
