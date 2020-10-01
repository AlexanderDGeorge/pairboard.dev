import React from "react";
import styled from "styled-components";
import { StyledButton } from "../styled-components/formStyles";

export default () => {
    return (
        <UserOptions>
            <StyledButton>Message</StyledButton>
            <StyledButton>Pair</StyledButton>
            <StyledButton>Connect</StyledButton>
        </UserOptions>
    );
};

const UserOptions = styled.div`
    height: 100px;
    width: auto;
`;
