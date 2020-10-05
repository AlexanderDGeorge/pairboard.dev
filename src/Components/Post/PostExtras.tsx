import React, { useContext } from "react";
import styled from "styled-components";
import { FaCommentAlt, FaEllipsisH } from "react-icons/fa";
import { ModalContext } from "../../Application";

export default (props: { toggle: Function }) => {
    const { setModalContent } = useContext(ModalContext)!;

    function handleOpenComments() {}

    return (
        <PostExtras>
            <FaCommentAlt onClick={handleOpenComments} />
            <FaEllipsisH onClick={() => props.toggle()} />
        </PostExtras>
    );
};

const PostExtras = styled.div`
    position: absolute;
    bottom: 0;
    left: calc(50% - 25px);
    width: 50px;
    padding: 5px;
    background-color: ${(props) => props.theme.light};
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
