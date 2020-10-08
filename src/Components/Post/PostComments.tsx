import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ModalContext, UserContext } from "../../Application";
import { firestore } from "../../firebase/firebase";
import { addComment } from "../../firebase/post";
import {
    CommentSchema,
    PostSchema,
    SingleCommentSchema,
} from "../../firebase/schema";
import { StyledButton } from "../../styled-components/formStyles";
import getDateDescription from "../../util/getDateToNow";
import useFirebaseQuery from "../../util/useFirebaseQuery";
import useOnOutsideClick from "../../util/useOnOutsideClick";
import LoadingBar from "../Animated/LoadingBar";

export default (props: { commentsId: PostSchema["commentsId"] }) => {
    const commentsRef = useRef(null);
    const { handleModal } = useContext(ModalContext)!;

    const { status, data } = useFirebaseQuery(
        firestore().collection("postComments").doc(props.commentsId)
    );

    useOnOutsideClick(commentsRef, () => handleModal());

    if (status === "loading") {
        return (
            <Loading ref={commentsRef}>
                <LoadingBar />
            </Loading>
        );
    } else {
        return (
            <PostComments ref={commentsRef}>
                <h2>Comments</h2>
                {data?.comments?.map(
                    (comment: SingleCommentSchema, i: number) => (
                        <Comment comment={comment} key={i} />
                    )
                )}
                <CreateComment commentsId={props.commentsId} />
            </PostComments>
        );
    }
};

const Loading = styled.div`
    height: 200px;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PostComments = styled.div`
    min-height: 200px;
    max-height: 80%;
    width: 90%;
    max-width: 800px;
    border: 1px solid ${(props) => props.theme.verydark};
    padding: 10px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    cursor: auto;
    > h2 {
        margin-bottom: 10px;
    }
    > * {
        margin-bottom: 5px;
    }
`;

function Comment(props: { comment: SingleCommentSchema }) {
    const { username, content, createdAt } = props.comment;
    return (
        <StyledComment>
            <UserLink to={`/user/${username}`}>{username}</UserLink>
            <span>{content}</span>
            <p>{getDateDescription(new Date(createdAt))}</p>
        </StyledComment>
    );
}

function CreateComment(props: { commentsId: CommentSchema["id"] }) {
    const { username } = useContext(UserContext)!;
    const [content, setContent] = useState("");

    async function handleCreateComment() {
        await addComment(props.commentsId, username, content);
        setContent("");
    }

    return (
        <StyledComment>
            <UserLink to={`/users/${username}`}>{username}</UserLink>
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="add a comment"
            />
            <StyledButton
                onClick={handleCreateComment}
                disabled={!!!content.length}
            >
                send
            </StyledButton>
        </StyledComment>
    );
}

const StyledComment = styled.div`
    min-height: 30px;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.verylight};
    padding: 5px;
    display: flex;
    justify-content: space-between;
    > input,
    span {
        height: 100%;
        width: 70%;
        outline: none;
    }
    > button {
        height: 100%;
        min-width: 0;
        width: 50px;
    }
    > p {
        height: 100%;
        min-width: 100px;
        font-size: 0.7em;
        font-weight: 100;
        text-align: right;
    }
`;

const UserLink = styled(Link)`
    height: 100%;
    min-width: 100px;
    width: 20%;
    margin-right: 10px;
    display: flex;
    align-items: center;
    overflow: hidden;
    font-weight: 500;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;
