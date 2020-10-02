import React, { useContext, SyntheticEvent } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { UserContext } from "../../Application";
import { joinPost } from "../../firebase/post";
import { PostSchema } from "../../firebase/schema";
import getDateToNow from "../../util/getDateToNow";
import PostExtras from "./PostExtras";

export default (props: { post: PostSchema }) => {
    const {
        id,
        active,
        createdAt,
        description,
        difficulty,
        host,
        language,
        maxCapacity,
        participants,
    } = props.post;
    const { uid } = useContext(UserContext)!;
    const history = useHistory();

    const dateToNow = getDateToNow(new Date(createdAt));

    async function handleClick(e: SyntheticEvent) {
        e.stopPropagation();
        if (uid === host.uid) return;
        // [TODO]: add some kind of loading here check if active
        joinPost(uid, id);
    }

    function handleLink(e: SyntheticEvent) {
        e.stopPropagation();
        uid === host.uid
            ? history.replace("/profile")
            : history.replace(`/user/${host.username}`);
    }

    return (
        <Post onClick={handleClick}>
            <HostInfo onClick={handleLink}>
                <HostPhoto src={host.photoURL} alt="" />
                <p>{host.username}</p>
                <p style={{ textDecoration: "none" }}>{host.score}</p>
            </HostInfo>
            <PostInfo>
                <div>
                    <Language>
                        {language} | {difficulty}
                    </Language>
                    {active ? <Active /> : <DateToNow>{dateToNow}</DateToNow>}
                </div>
                <PostDescription>{description}</PostDescription>
                <Participants>
                    {participants.length} / {maxCapacity}
                </Participants>
            </PostInfo>
            <PostExtras />
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

const PostInfo = styled.div`
    height: 100%;
    width: 100%;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    > div {
        padding-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

const PostDescription = styled.p`
    grid-area: description;
`;

const Language = styled.h4`
    grid-area: language;
    font-weight: 500;
`;

const DateToNow = styled.h6`
    grid-area: date;
    font-weight: 100;
`;

const Active = styled.div`
    grid-area: date;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.green};
`;

const Participants = styled.div`
    position: absolute;
    bottom: 0;
    right: 10px;
    font-size: 0.8em;
    font-weight: 100;
`;
