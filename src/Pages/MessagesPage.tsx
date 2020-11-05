import React from "react";
import styled from "styled-components";
import MessagesNav from "../Components/Messages/MessagesNav";
import MessagesRouter from "../Components/Messages/MessagesRouter";

export default function MessagesPage() {
    return (
        <StyledMessagesPage>
            <MessagesNav />
            <MessagesRouter />
        </StyledMessagesPage>
    );
}

const StyledMessagesPage = styled.div`
    min-height: 100%;
    height: 100%;
    width: 100%;
    padding: 100px 10%;
    display: flex;
    @media screen and (max-width: 600px) {
        flex-direction: column;
    }
`;
