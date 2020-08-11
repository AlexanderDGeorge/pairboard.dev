import React from "react";
import styled from "styled-components";

export default (props: { value: string; setValue: Function }) => {
    return (
        <AddLocation>
            <h1>Add Your Location</h1>
            <input
                type="text"
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
                maxLength={24}
                placeholder="Seattle, WA"
            />
        </AddLocation>
    );
};

const AddLocation = styled.div`
    > input {
        width: 100%;
        padding: 5%;
        font-size: 1em;
        border: 1px solid ${(props) => props.theme.accent};
        outline: none;
    }
`;
