import React from "react";
import styled from "styled-components";
import LinkBar from "../Nav/LinkBar";

export default () => {
    return (
        <Home>
            <LinkBar />
        </Home>
    );
};

const Home = styled.div`
    min-height: 100%;
    height: 100%;
    width: 100%;
`;
