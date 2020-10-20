import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../Application";
import { joinPost } from "../../firebase/post";
import { PostSchema } from "../../firebase/schema";
import PostExtras from "./PostExtras";
import { Link } from "react-router-dom";
import getDateToNow from "../../util/getDateToNow";

export default (props: { post: PostSchema }) => {
    const {
        id,
        createdAt,
        description,
        difficulty,
        host,
        language,
        maxCapacity,
        participants,
        title,
    } = props.post;
    const { uid } = useContext(UserContext)!;
    const dateToNow = getDateToNow(new Date(createdAt));

    async function handleJoin(e: React.SyntheticEvent) {
        e.stopPropagation();
        joinPost(uid, id, host);
    }

    return (
        <Post onClick={handleJoin}>
            <Top>
                <img src={host.photoURL} alt="" />
                <div>
                    <h3>{title}</h3>
                    <span>
                        {difficulty} | {language}
                    </span>
                    <Link to={`/user/${host.username}`}>{host.username}</Link>
                </div>
            </Top>
            <p>{description}</p>
            <Bottom>
                <p>{dateToNow}</p>
                <PostExtras post={props.post} />
                <p style={{ textAlign: "end" }}>
                    {participants.length} / {maxCapacity}
                </p>
            </Bottom>
        </Post>
    );
};

const Post = styled.div`
    min-height: 200px;
    min-width: 300px;
    margin: 0 10px 10px 0;
    border: 1px solid ${(props) => props.theme.verydark};
    border-radius: 5px;
    padding: 10px 10px 0 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all linear 0.2s;
    &:hover {
        transition: all linear 0.2s;
        border: 1px solid ${(props) => props.theme.accent};
        box-shadow: 0 0 20px -8px ${(props) => props.theme.verydark};
    }
    > p {
        min-height: 90px;
        font-weight: 300;
        overflow-y: scroll;
    }
`;

const Top = styled.div`
    height: 80px;
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    > img {
        height: 100%;
        width: auto;
        margin-right: 10px;
    }
    > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        > h3 {
            font-weight: 500;
        }
    }
`;

const Bottom = styled.div`
    height: 30px;
    width: 100%;
    align-self: flex-end;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    font-weight: 100;
    font-size: 0.8em;
    > p {
        width: 100px;
    }
`;
