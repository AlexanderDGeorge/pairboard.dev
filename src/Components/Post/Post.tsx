import React, { useContext, SyntheticEvent, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { UserContext } from "../../Application";
import { joinPost } from "../../firebase/post";
import { PostSchema } from "../../firebase/schema";
import PostFront from "./PostFront";
import PostDetails from "./PostDetails";
import PostExtras from "./PostExtras";

export default (props: { post: PostSchema }) => {
    const { id, active, host } = props.post;
    const { uid } = useContext(UserContext)!;
    const history = useHistory();
    const [front, setFront] = useState(true);

    async function handleClick(e: SyntheticEvent) {
        e.stopPropagation();
        if (uid === host.uid) return;
        if (active) {
            joinPost(uid, id, host);
        }
        // [TODO]: add some kind of loading here check if active
    }

    function handleLink(e: SyntheticEvent) {
        e.stopPropagation();
        uid === host.uid
            ? history.replace("/profile")
            : history.replace(`/user/${host.username}`);
    }

    const toggle = () => {
        setFront((front) => !front);
    };

    return (
        <Post onClick={handleClick}>
            <HostInfo onClick={handleLink}>
                <HostPhoto src={host.photoURL} alt="" />
                <p>{host.username}</p>
                <p style={{ textDecoration: "none" }}>{host.score}</p>
            </HostInfo>
            {front ? (
                <PostFront post={props.post} />
            ) : (
                <PostDetails post={props.post} />
            )}
            <PostExtras toggle={toggle} post={props.post} />
        </Post>
    );
};

const Post = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid ${(props) => props.theme.verydark};
    padding: 10px 10px 20px 10px;
    cursor: pointer;
    display: flex;
    transition: all linear 0.2s;
    &:hover {
        transition: all linear 0.2s;
        border: 1px solid ${(props) => props.theme.accent};
        box-shadow: 0 0 20px -8px ${(props) => props.theme.verydark};
    }
    @media screen and (max-width: 600px) {
        min-height: 200px;
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: 20px 20px auto;
        grid-template-areas:
            "language username"
            "difficulty date"
            "description description";
    }
`;

const HostInfo = styled.div`
    border-right: 1px solid ${(props) => props.theme.verylight};
    padding-right: 10px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    font-size: 0.75em;
    font-weight: 200;
    &:hover {
        text-decoration: underline;
    }
    @media screen and (max-width: 600px) {
        border-right: 0;
        border-bottom: 1px solid ${(props) => props.theme.verylight};
        margin-bottom: 10px;
    }
`;

const HostPhoto = styled.img`
    height: 100px;
    width: 100px;
    border: 1px solid ${(props) => props.theme.accent};
    @media screen and (max-width: 600px) {
        height: 0;
        width: 0;
        border: 0;
    }
`;
