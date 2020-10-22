import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { ModalContext, UserContext } from "../../Application";
import { PostSchema } from "../../firebase/schema";
import useOnOutsideClick from "../../util/useOnOutsideClick";
import PostComments from "./PostComments";
import { deletePost, joinPost } from "../../firebase/post";

export default (props: { post: PostSchema }) => {
    const { uid } = useContext(UserContext)!;
    const { commentsId, active, host, id } = props.post;
    const optionsRef = useRef(null);
    const { handleModal } = useContext(ModalContext)!;

    useOnOutsideClick(optionsRef, () => handleModal());

    async function handleJoin(e: React.SyntheticEvent) {
        e.stopPropagation();
        if (active) {
            joinPost(uid, id);
        }
        // [TODO]: add some kind of loading here check if active
    }

    async function handleDelete(e: React.SyntheticEvent) {
        e.stopPropagation();
        if (active) {
            // return error
            return;
        } else {
            await deletePost(props.post);
            handleModal();
        }
    }

    return (
        <PostOptions ref={optionsRef}>
            {active ? <button onClick={handleJoin}>Join</button> : null}
            <button>Message Host</button>
            <button
                onClick={() =>
                    handleModal(<PostComments commentsId={commentsId} />)
                }
            >
                Show Comments
            </button>
            {host.uid === uid ? (
                <button onClick={handleDelete}>Delete Post</button>
            ) : null}
            <button onClick={() => handleModal()}>Close</button>
        </PostOptions>
    );
};

const PostOptions = styled.div`
    /* min-height: 200px; */
    max-height: 80%;
    width: 90%;
    max-width: 800px;
    border: 1px solid ${(props) => props.theme.verydark};
    padding: 10px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    cursor: auto;
    > button {
        min-height: 30px;
        height: 50px;
        width: 100%;
        border-bottom: 1px solid ${(props) => props.theme.verylight};
        padding: 10px;
        transition: all 0s;
        outline: none;
        &:hover {
            transition: all 0s;
            background-color: ${(props) => props.theme.light};
        }
    }
`;
