import React from "react";
import styled from "styled-components";
import LinkBar from "../Components/Nav/LinkBar";

export default () => {
    return (
        <Pairs>
            <LinkBar />
        </Pairs>
    );
};

const Pairs = styled.div`
    height: 100%;
    width: 100%;
`;
