import React, { useContext } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { ModalContext } from "../../Application";

export default () => {
    const { modalOpen, modalContent } = useContext(ModalContext)!;
    const modalRoot = document.getElementById("modal-root");

    if (modalOpen && modalRoot) {
        return ReactDOM.createPortal(<Modal>{modalContent}</Modal>, modalRoot);
    } else {
        return null;
    }
};

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
`;

// const ModalContent = styled.div`
//     height: 300px;
//     width: 300px;
//     background-color: ${(props) => props.theme.white};
// `;
