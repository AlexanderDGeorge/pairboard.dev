import React from 'react';
import { MdSend } from 'react-icons/md';
import styled from 'styled-components';
import { HeavyH1 } from '../../styled-components/StyledHeaders';

export default function NewMessage() {
    return (
        <StyledNewMessage>
            <HeavyH1>Compose a Message</HeavyH1>
        </StyledNewMessage>
    );
}

const StyledNewMessage = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    padding: 10px;
`;
