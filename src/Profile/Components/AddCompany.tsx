import React from "react";
import styled from "styled-components";

export default (props: { value: string; setValue: Function }) => {
    return (
        <AddCompany>
            <h1>Where Do You Work?</h1>
            <input
                type="text"
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
                maxLength={24}
                placeholder="Google"
            />
        </AddCompany>
    );
};

const AddCompany = styled.div`
    > input {
        width: 100%;
        padding: 5%;
        font-size: 1em;
        border: 1px solid ${(props) => props.theme.accent};
        outline: none;
    }
`;
