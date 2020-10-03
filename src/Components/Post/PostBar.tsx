import React, { useContext } from "react";
import styled from "styled-components";
import usePostState from "./usePostState";
import PostOption from "./PostOption";
import Description from "./PostDescription";
import { LANGUAGES, DIFFICULTIES } from "./constants";
import { UserContext } from "../../Application";
import { createPost } from "../../firebase/post";

export default () => {
    const [postParams, setPostParams] = usePostState();
    const { uid, photoURL, score, username, postId } = useContext(UserContext)!;

    function handleClick() {
        const { description, difficulty, language, tags } = postParams;
        if (!postId) {
            createPost(
                { uid, photoURL, score, username },
                description,
                difficulty,
                language,
                2, //maxCapacity
                tags
            );
        }
    }

    return (
        <PostBar>
            <h2>Create a Post</h2>
            <PostOption
                postParams={postParams}
                setPostParams={setPostParams}
                filter="language"
                options={LANGUAGES}
            />
            <PostOption
                postParams={postParams}
                setPostParams={setPostParams}
                filter="difficulty"
                options={DIFFICULTIES}
            />
            <Description
                postParams={postParams}
                setPostParams={setPostParams}
            />
            <PostButton onClick={handleClick}>Post</PostButton>
        </PostBar>
    );
};

const PostBar = styled.div`
    position: relative;
    height: 100%;
    min-width: 261px;
    border-right: 1px solid ${(props) => props.theme.verylight};
    padding-right: 10px;
    background-color: ${(props) => props.theme.white};
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 600px) {
        height: auto;
        width: 100%;
        border-right: 0;
        border-bottom: 1px solid ${(props) => props.theme.verylight};
        padding-right: 0;
        flex-direction: row;
        flex-wrap: wrap;
    }
    > h2 {
        margin-bottom: 10px;
    }
`;

const PostButton = styled.button`
    height: 60px;
    width: 100%;
    margin: 2% 0;
    padding: 10px;
    font-size: 1em;
    font-weight: 600;
    background-color: ${(props) => props.theme.blue};
    color: ${(props) => props.theme.verylight};
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: color 0.2s linear;
    &:hover {
        transition: color 0.2s linear;
        color: ${(props) => props.theme.white};
    }
`;
