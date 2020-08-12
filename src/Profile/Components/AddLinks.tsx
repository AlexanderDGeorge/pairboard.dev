import React from "react";
import styled from "styled-components";
import { User } from "../../firebase/user";

export default (props: { value: User["links"]; setValue: Function }) => {
    return (
        <AddLinks>
            <h2>Add Links</h2>
        </AddLinks>
    );
};

const AddLinks = styled.div`
    > input {
        width: 100%;
        padding: 5%;
        font-size: 1em;
        border: 1px solid ${(props) => props.theme.accent};
        outline: none;
    }
`;
