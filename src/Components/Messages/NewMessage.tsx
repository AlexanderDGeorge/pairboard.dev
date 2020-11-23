import React from "react";
import styled from "styled-components";
// import SearchBar from "../Search/SearchBar";
export default function NewMessage() {
    return (
        <StyledNewMessage>
            <h2>Compose a Message</h2>
            {/* To: <SearchBar /> */}
        </StyledNewMessage>
    );
}

const StyledNewMessage = styled.div`
    height: 100%;
    width: 100%;
    border-left: 1px solid ${(props) => props.theme.light};
    padding-left: 10px;
`;
