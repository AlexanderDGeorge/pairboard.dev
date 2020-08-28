import React, { useRef, useContext } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import useOnOutsideClick from "../util/useOnOutsideClick";
import { ModalContext } from "../Application";

export default () => {
    const { modalOpen } = useContext(ModalContext)!;
    const modalRoot = document.getElementById("modal-root");

    if (modalOpen && modalRoot) {
        return ReactDOM.createPortal(<Modal />, modalRoot);
    } else {
        return null;
    }
};

function Modal() {
    const { handleModal, closeOnOutside, modalContent } = useContext(
        ModalContext
    )!;
    const modalRef = useRef(null);
    useOnOutsideClick(modalRef, () => handleModal());

    return (
        <StyledModal>
            <ModalContent ref={closeOnOutside ? modalRef : null}>
                {modalContent}
            </ModalContent>
        </StyledModal>
    );
}

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

const ModalContent = styled.div`
    height: 300px;
    width: 300px;
    background-color: ${(props) => props.theme.white};
`;
