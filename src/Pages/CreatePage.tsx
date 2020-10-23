import React from "react";
import styled from "styled-components";
import CreatePair from "../Components/PostCreate/CreatePair";

export default function CreatePage() {
    return (
        <Create>
            <h1>Create a Post</h1>
            <CreatePair />
        </Create>
    );
}

const Create = styled.div`
    position: relative;
    min-height: 100%;
    width: 100%;
    padding: 2% 10%;
    display: flex;
    flex-direction: column;
    > h1 {
        width: 100%;
        margin-bottom: 20px;
    }
`;
