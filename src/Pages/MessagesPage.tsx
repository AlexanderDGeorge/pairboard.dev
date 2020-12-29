import React from 'react';
import styled from 'styled-components';
import MessagesNav from '../Components/Messages/MessagesNav';
import MessagesRouter from '../Components/Messages/MessagesRouter';

export default function MessagesPage() {
    return (
        <StyledPage>
            <StyledMessagesPage>
                <MessagesNav />
                <MessagesRouter />
            </StyledMessagesPage>
        </StyledPage>
    );
}

const StyledPage = styled.div`
    min-height: 80%;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    padding: 2% 15%;
    background-color: ${(props) => props.theme.verylight};
    @media screen and (max-width: 1000px) {
        padding: 2% 8%;
    }
    @media screen and (max-width: 600px) {
        padding: 2%;
    }
`;

const StyledMessagesPage = styled.div`
    height: 100%;
    width: 100%;
    border: 2px solid ${(props) => props.theme.accent};
    border-radius: 10px;
    background-color: ${(props) => props.theme.white};
    display: flex;
    overflow-y: auto;
`;
