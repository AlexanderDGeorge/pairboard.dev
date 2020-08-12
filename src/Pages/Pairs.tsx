import React from "react";
import styled from "styled-components";
import Nav from "../Nav/Nav";

export default () => {
    return (
        <Pairs>
            <Nav />
        </Pairs>
    );
};

const Pairs = styled.div`
    height: 100%;
    width: 100%;
`;
