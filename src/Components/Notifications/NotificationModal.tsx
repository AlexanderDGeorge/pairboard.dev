import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../Application';
import { HeavyH1 } from '../../styled-components/StyledHeaders';
import useLockBodyScroll from '../../util/useLockBodyScroll';
import useOnOutsideCLick from '../../util/useOnOutsideClick';

export default function NotificationModal() {
    const { handleModal } = useContext(ModalContext)!;
    const modalRef = useRef(null);
    useOnOutsideCLick(modalRef, () => handleModal());
    useLockBodyScroll();

    return (
        <StyledNotificationModal ref={modalRef}>
            <HeavyH1>Notifications</HeavyH1>
            <h1>Coming Soon</h1>
        </StyledNotificationModal>
    );
}

const StyledNotificationModal = styled.div`
    height: 60%;
    width: 60%;
    border-radius: 5px;
    padding: 2%;
    background-color: ${(props) => props.theme.white};
    display: flex;
    flex-direction: column;
    cursor: auto;
    overflow-y: auto;
`;
