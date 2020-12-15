import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../Application';
import { UserSchema } from '../../firebase/schema';
import { HeavyH1 } from '../../styled-components/StyledHeaders';
import useOnOutsideCLick from '../../util/useOnOutsideClick';
import SmallUserCard from './SmallUserCard';

export default function UserConnectionsModal(props: { user: UserSchema }) {
    const { handleModal } = useContext(ModalContext)!;
    const [connections, setConnections] = useState([]);
    const modalRef = useRef(null);

    useOnOutsideCLick(modalRef, () => handleModal());

    useEffect(() => {
        props.user.connections.forEach((connection) => {});
    }, [props.user.connections]);

    return (
        <StyledModal ref={modalRef}>
            <HeavyH1>Connections</HeavyH1>
            {/* {connections.map((connection, i) => {
                return (
                    <SmallUserCard user={connection} key={i}/>
                )
            })} */}
        </StyledModal>
    );
}

const StyledModal = styled.div`
    height: 60%;
    width: 40%;
    /* border: 1px solid ${(props) => props.theme.verydark}; */
    border-radius: 10px;
    padding: 2%;
    display: flex;
    background-color: ${(props) => props.theme.white};
`;
