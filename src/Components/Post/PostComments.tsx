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

    console.log(status, data);

    useOnOutsideClick(commentsRef, () => handleModal());

    if (status === "loading") {
        return (
            <PostComments
                ref={commentsRef}
                style={{ alignItems: "center", justifyContent: "center" }}
            >
                <h2>Comments</h2>
                <LoadingBar />
            </PostComments>
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

const PostComments = styled.div`
    min-height: 200px;
    max-height: 80%;
    width: 80%;
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
    height: 30px;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.verylight};
    padding: 5px;
    display: flex;
    > input,
    span {
        height: 100%;
        width: 100%;
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
    width: 100px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    overflow: hidden;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;
