import React from "react";
import styled from "styled-components";

export default (props: { text: string }) => {
    return <HelpText>{props.text}</HelpText>;
};

const HelpText = styled.div`
    z-index: 3;
    position: absolute;
    top: -50px;
    right: 0;
    height: 50px;
    /* width: 50px; */
    padding: 5px;
    font-size: 0.6em;
    background-color: rgba(0, 0, 0, 0.3);
`;
