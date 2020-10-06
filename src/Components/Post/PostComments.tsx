import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { ModalContext } from "../../Application";
import { firestore } from "../../firebase/firebase";
import { PostSchema } from "../../firebase/schema";
import useFirebaseQuery from "../../util/useFirebaseQuery";
import useOnOutsideClick from "../../util/useOnOutsideClick";

export default (props: { commentsId: PostSchema["commentsId"] }) => {
    const commentsRef = useRef(null);
    const { handleModal } = useContext(ModalContext)!;

    const { status, data } = useFirebaseQuery(
        firestore().collection("postComments").doc(props.commentsId)
    );

    console.log(status, data);

    useOnOutsideClick(commentsRef, () => handleModal());

    return <PostComments ref={commentsRef}></PostComments>;
};

const PostComments = styled.div`
    min-height: 200px;
    min-width: 300px;
    border: 1px solid ${(props) => props.theme.verydark};
    padding: 10px;
`;

export function EmptyComments() {
    const commentsRef = useRef(null);
    const { handleModal } = useContext(ModalContext)!;

    useOnOutsideClick(commentsRef, () => handleModal());

    return (
        <PostComments ref={commentsRef}>
            <h2>There are no comments yet for this post</h2>
        </PostComments>
    );
}
