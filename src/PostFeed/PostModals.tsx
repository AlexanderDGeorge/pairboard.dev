import React, { useRef, useContext, useEffect } from "react";
import styled from "styled-components";
import { ModalContext, UserContext } from "../Application";
import useLockBodyScroll from "../util/useLockBodyScroll";
import { LoadingBar } from "../AnimatedComponents/Loaders";
import { pingPostOwner, deletePing } from "../firebase/ping";
import { User } from "../firebase/user";

export const PingPostOwner = (props: { postOwnerId: User["uid"] }) => {
    const modalRef = useRef(null);
    const { handleModal } = useContext(ModalContext)!;
    const currentUser = useContext(UserContext)!;

    useLockBodyScroll();
    useEffect(() => {
        pingPostOwner({
            ownerId: props.postOwnerId,
            userId: currentUser.uid,
            username: currentUser.username,
            userScore: currentUser.score,
            userPhotoURL: currentUser.photoURL,
        });
    }, [currentUser, props]);

    function handleCancel() {
        deletePing(props.postOwnerId);
        handleModal();
    }

    return (
        <StyledNotification ref={modalRef}>
            <h2>Pinging Pair</h2>
            <p>ping will timeout after one minute</p>
            <LoadingBar />
            <button onClick={handleCancel}>cancel</button>
        </StyledNotification>
    );
};

const StyledNotification = styled.div`
    min-height: 200px;
    min-width: 300px;
    border: 1px solid ${(props) => props.theme.verydark};
    padding: 10px;
    box-shadow: 0 0 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;
