import React from "react";
import styled from "styled-components";

export default () => {
    return (
        <MessagesNav>
            <h2>Recent Messages</h2>
        </MessagesNav>
    );
};

const MessagesNav = styled.div`
    height: 100%;
    width: 30%;
    padding-right: 10px;
    > h2 {
        margin-bottom: 10px;
    }
`;
