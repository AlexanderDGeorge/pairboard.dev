import React from "react";
import styled from "styled-components";
// import SearchBar from "../Search/SearchBar";
export default () => {
    return (
        <NewMessage>
            <h2>Compose a Message</h2>
            {/* To: <SearchBar /> */}
        </NewMessage>
    );
};

const NewMessage = styled.div`
    height: 100%;
    width: 100%;
    border-left: 1px solid ${(props) => props.theme.verylight};
    padding-left: 10px;
`;
