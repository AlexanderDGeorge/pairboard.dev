import React, { useRef, useContext } from "react";
import styled from "styled-components";
import useOnOutsideClick from "../util/useOnOutsideClick";
import { ModalContext } from "../Application";
import useLockBodyScroll from "../util/useLockBodyScroll";

export const PostOwnerNotification = () => {
    useLockBodyScroll();
    return <StyledNotification></StyledNotification>;
};

const StyledNotification = styled.div`
    min-height: 200px;
    min-width: 300px;
    border: 1px solid ${(props) => props.theme.verydark};
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;

export const WaitingOnOwnerNotification = () => {
    const modalRef = useRef(null);
    const { handleModal } = useContext(ModalContext)!;

    useLockBodyScroll();
    useOnOutsideClick(modalRef, () => handleModal());

    return (
        <StyledNotification ref={modalRef}>
            <h2>Waiting on Response...</h2>
        </StyledNotification>
    );
};
