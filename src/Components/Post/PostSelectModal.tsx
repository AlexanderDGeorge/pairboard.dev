import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../Application';
import useLockBodyScroll from '../../util/useLockBodyScroll';
import useOnOutsideCLick from '../../util/useOnOutsideClick';

export default function PostSelectModal() {
    const modalRef = useRef(null);
    const { handleModal } = useContext(ModalContext)!;

    useOnOutsideCLick(modalRef, () => handleModal());
    useLockBodyScroll();

    return (
        <StyledModal ref={modalRef}>
            Post Info
        </StyledModal>
    )
}

const StyledModal = styled.div`
        height: 80%;
    max-height: 800px;
    width: 80%;
    max-width: 1000px;
    border-radius: 5px;
    padding: 5%;
    display: flex;
    flex-direction: column;
    cursor: auto;
    overflow-y: scroll;
`;