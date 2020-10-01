import React from "react";
import styled from "styled-components";
import { UserSchema } from "../firebase/schema";
import { StyledButton } from "../styled-components/formStyles";

export default (props: { user: UserSchema }) => {
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
    width: 100%;
    display: flex;
    justify-content: space-between;
    /* background: ${(props) =>
        `linear-gradient(140deg, ${props.theme.orange}, ${props.theme.yellow}, ${props.theme.green}, ${props.theme.blue}) 3`}; */
`;
