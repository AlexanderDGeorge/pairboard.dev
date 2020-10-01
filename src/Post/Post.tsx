import React, { useContext, SyntheticEvent } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { UserContext } from "../Root";
import { joinPost } from "../firebase/post";
import { PostSchema } from "../firebase/schema";

export default (props: { post: PostSchema }) => {
    const { id, host, language, difficulty, description } = props.post;
    const { uid } = useContext(UserContext)!;
    const history = useHistory();

    async function handleClick(e: SyntheticEvent) {
        e.stopPropagation();
        if (uid === host.uid) return;
        // [TODO]: add some kind of loading here
        joinPost(uid, id);
    }

    function handleLink(e: SyntheticEvent) {
        e.stopPropagation();
        uid === host.uid
            ? history.replace("/profile/stats")
            : history.replace(`/user/${host.username}`);
    }

    return (
        <Post onClick={handleClick}>
            <HostPhoto src={host.photoURL} alt="" />
            <Username>
                <p>{host.username}</p>
                <p>{host.score}</p>
            </Username>
            <PostLanguage>{language}</PostLanguage>
            <PostDifficulty>{difficulty}</PostDifficulty>
            <PostDescription>{description}</PostDescription>
        </Post>
    );
};

const Post = styled.div`
    height: 100px;
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid ${(props) => props.theme.verydark};
    padding: 10px;
    cursor: pointer;
    display: grid;
    grid-template-columns: 80px 20% 15% auto;
    grid-template-rows: 50% 50%;
    grid-template-areas:
        "hostPhoto username language difficulty"
        "hostPhoto username description description";
    transition: all linear 0.2s;
    &:hover {
        transition: all linear 0.2s;
        border: 1px solid ${(props) => props.theme.accent};
        box-shadow: 0 0 20px -8px ${(props) => props.theme.verydark};
    }
    @media screen and (max-width: 600px) {
        height: 200px;
        grid-template-columns: 30% 30% auto;
        grid-template-rows: 30% 70%;
        grid-template-areas:
            "hostPhoto language difficulty"
            "username description description";
    }
`;

const HostPhoto = styled.img`
    height: 100%;
    width: auto;
    margin-right: 10px;
    border: 1px solid ${(props) => props.theme.accent};
    grid-area: hostPhoto;
`;

const Username = styled.button`
    height: 100%;
    margin-right: 10px;
    grid-area: username;
    display: flex;
    flex-direction: column;
    font-size: 1em;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const PostLanguage = styled.h4`
    margin-right: 10px;
    grid-area: language;
    font-weight: 500;
`;

const PostDifficulty = styled.h4`
    margin-right: 10px;
    grid-area: difficulty;
    font-weight: 400;
`;

const PostDescription = styled.h4`
    grid-area: description;
    color: ${(props) => props.theme.medium};
`;
