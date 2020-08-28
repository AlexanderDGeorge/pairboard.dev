import React, { useContext } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { ModalContext } from "../Application";

export default () => {
    const { modalOpen, modalContent } = useContext(ModalContext)!;
    const modalRoot = document.getElementById("modal-root");

    if (modalOpen && modalRoot) {
        return ReactDOM.createPortal(
            <StyledModal>{modalContent}</StyledModal>,
            modalRoot
        );
    } else {
        return null;
    }
};

const StyledModal = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
`;
