import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

export default () => {
    const modalRoot =
        document.getElementById("modal-root") || document.createElement("div");

    return ReactDOM.createPortal(<Modal></Modal>, modalRoot);
};

const Modal = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
`;
