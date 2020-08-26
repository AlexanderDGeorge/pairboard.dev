import React, { useContext } from "react";
import styled from "styled-components";
import usePostState from "./usePostState";
import PostOption from "./PostOption";
import Description from "./Description";
import { LANGUAGES, DIFFICULTIES, TAGS } from "../util/constants";
import { UserContext } from "../Application";
import { createPostDocument } from "../firebase/post";

export default () => {
    const [postParams, setPostParams] = usePostState();
    const currentUser = useContext(UserContext)!;

    async function handleClick() {
        await createPostDocument(currentUser, postParams);
    }

    return (
        <PostBar>
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
            <PostOption
                postParams={postParams}
                setPostParams={setPostParams}
                filter="tag"
                options={TAGS}
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
    min-height: 140px;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.verylight};
    padding: 2% 5%;
    background-color: ${(props) => props.theme.white};
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 20px 20px -20px ${(props) => props.theme.medium};
`;

const PostButton = styled.button`
    height: 60px;
    width: 120px;
    padding: 10px;
    font-size: 1em;
    font-weight: 600;
    background-color: ${(props) => props.theme.verydark};
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
