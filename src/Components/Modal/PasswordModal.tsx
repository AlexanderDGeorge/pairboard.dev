import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MdLock } from "react-icons/md";
import { StyledField } from "../../styled-components/formStyles";
import useOnOutsideCLick from "../../util/useOnOutsideClick";
import { ModalContext } from "../../Application";
import useLockBodyScroll from "../../util/useLockBodyScroll";

export default function PasswordModal(props: {
    pText?: string;
    submitCallback: Function;
}) {
    const [password, setPassword] = useState("");
    const modalRef = useRef(null);
    const { handleModal } = useContext(ModalContext)!;
    useOnOutsideCLick(modalRef, () => handleModal());
    useLockBodyScroll();

    useEffect(() => {
        function listenForEnter(e: KeyboardEvent) {
            if (e.key === "Enter") {
                props.submitCallback(password);
            }
        }
        document.addEventListener("keypress", listenForEnter);
        return () => {
            document.removeEventListener("keypress", listenForEnter);
        };
        // eslint-disable-next-line
    }, [password]);

    return (
        <StyledPasswordModal ref={modalRef}>
            <MdLock />
            <p>{props.pText}</p>
            <StyledField>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </StyledField>
        </StyledPasswordModal>
    );
}

const StyledPasswordModal = styled.div`
    height: 20%;
    width: 20%;
    border: 1px solid ${(props) => props.theme.accent};
    border-radius: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    cursor: auto;
    > svg {
        height: 50px;
        width: auto;
    }
    > p {
        font-weight: 100;
    }
`;
