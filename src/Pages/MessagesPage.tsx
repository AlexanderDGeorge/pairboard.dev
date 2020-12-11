import React from 'react';
import styled from 'styled-components';
import MessagesNav from '../Components/Messages/MessagesNav';
import MessagesRouter from '../Components/Messages/MessagesRouter';

export default function MessagesPage() {
    return (
        <StyledMessagesPage>
            <MessagesNav />
            <MessagesRouter />
        </StyledMessagesPage>
    );
}

const StyledMessagesPage = styled.div`
    height: 100%;
    width: 100%;
    border: 2px solid ${(props) => props.theme.accent};
    border-radius: 10px;
    background-color: ${(props) => props.theme.white};
    display: flex;
    overflow-y: auto;
`;
