import React from "react";
import styled from "styled-components";

export default function MessagesNav() {
    return (
        <StyledMessagesNav>
            <h2>Recent Messages</h2>
        </StyledMessagesNav>
    );
}

const StyledMessagesNav = styled.div`
    height: 100%;
    width: 30%;
    padding-right: 10px;
    > h2 {
        margin-bottom: 10px;
    }
`;
