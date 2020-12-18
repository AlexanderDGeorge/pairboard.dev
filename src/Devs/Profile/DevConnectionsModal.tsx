import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../Application';
import { HeavyH1 } from '../../styled-components/StyledHeadings';
import useLockBodyScroll from '../../util/useLockBodyScroll';
import useOnOutsideCLick from '../../util/useOnOutsideClick';
import { DevPublicProfile } from '../devSchema';
import ProfileCard from './ProfileCard';

export default function DevConnectionsModal(props: { dev: DevPublicProfile }) {
    const { handleModal } = useContext(ModalContext)!;
    const modalRef = useRef(null);

    useOnOutsideCLick(modalRef, () => handleModal());
    useLockBodyScroll();

    return (
        <StyledModal ref={modalRef}>
            <HeavyH1>Connections</HeavyH1>
            {props.dev.connections.map((connection, i) => {
                return <ProfileCard dev={connection} key={i} />;
            })}
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
