import React, { useContext } from "react";
import styled from "styled-components";
import { FaCommentAlt, FaEllipsisH } from "react-icons/fa";
import { ModalContext } from "../../Application";
import PostComments from "./PostComments";
import PostOptions from "./PostOptions";
import { PostSchema } from "../../firebase/schema";

export default function PostExtras(props: { post: PostSchema }) {
    const { handleModal } = useContext(ModalContext)!;

    function handleOpenComments(e: React.MouseEvent) {
        e.stopPropagation();
        handleModal(<PostComments commentsId={props.post.commentsId} />);
    }

    function handleOpenOptions(e: React.MouseEvent) {
        e.stopPropagation();
        handleModal(<PostOptions post={props.post} />);
    }

    return (
        <StyledPostExtras>
            <FaCommentAlt onClick={handleOpenComments} />
            <FaEllipsisH onClick={handleOpenOptions} />
        </StyledPostExtras>
    );
}

const StyledPostExtras = styled.div`
    width: 50px;
    padding: 5px;
    background-color: ${(props) => props.theme.light} !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > svg {
        position: relative;
        background-color: transparent;
        &:hover {
            fill: ${(props) => props.theme.white};
        }
    }
`;
