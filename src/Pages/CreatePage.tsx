import React from "react";
import styled from "styled-components";
import CreatePair from "../Components/PostCreate/CreatePair";

export default () => {
    return (
        <Create>
            <CreatePair />
        </Create>
    );
};

const Create = styled.div`
    position: relative;
    min-height: 100%;
    width: 100%;
    padding: 2% 5%;
    display: flex;
    flex-direction: column;
`;
