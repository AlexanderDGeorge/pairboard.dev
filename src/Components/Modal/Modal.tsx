import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { ModalContext } from '../../Application';
// import useLockBodyScroll from "../../util/useLockBodyScroll";

export default function Modal() {
    const { modalOpen, modalContent } = useContext(ModalContext)!;
    const modalRoot = document.getElementById('modal-root');

    // useLockBodyScroll();

    if (modalOpen && modalRoot) {
        return ReactDOM.createPortal(
            <StyledModal>{modalContent}</StyledModal>,
            modalRoot,
        );
    } else {
        return null;
    }
}

const StyledModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    height: 100%;
    width: 100%;
    padding: 2% 15%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    @media screen and (max-width: 1000px) {
        padding: 2% 8%;
    }
    @media screen and (max-width: 600px) {
        padding: 2%;
    }
`;

// const ModalContent = styled.div`
//     height: 300px;
//     width: 300px;
//     background-color: ${(props) => props.theme.white};
// `;
