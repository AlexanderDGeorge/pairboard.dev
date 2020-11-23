import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../Application';
import { UserSchema } from '../../firebase/schema';
import useOnOutsideCLick from '../../util/useOnOutsideClick';

export default function UserConnectionsModal(props: {user: UserSchema}) {
    const { handleModal } = useContext(ModalContext)!;
    const modalRef = useRef(null);
    const { connections } = props.user;

    useOnOutsideCLick(modalRef, () => handleModal());

    return (
        <StyledModal ref={modalRef}>
            <h2>Connections</h2>
        </StyledModal>
    )
}

const StyledModal = styled.div`
    height: 60%;
    width: 40%;
    border: 1px solid ${props => props.theme.verydark};
    border-radius: 10px;
    padding: 2%;
    display: flex;
    background-color: ${props => props.theme.white};
`;