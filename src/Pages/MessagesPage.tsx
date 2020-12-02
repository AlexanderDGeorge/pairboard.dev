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
    width: 100%;
`;
