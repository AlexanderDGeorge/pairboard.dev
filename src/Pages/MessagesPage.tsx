import React from "react";
import styled from "styled-components";
import MessagesNav from "../Components/Messages/MessagesNav";
import MessagesRouter from "../Components/Messages/MessagesRouter";

export default () => {
    return (
        <MessagesPage>
            <MessagesNav />
            <MessagesRouter />
        </MessagesPage>
    );
};

const MessagesPage = styled.div`
    min-height: 100%;
    height: 100%;
    width: 100%;
    padding: 2% 5%;
    display: flex;
    @media screen and (max-width: 600px) {
        flex-direction: column;
    }
`;
