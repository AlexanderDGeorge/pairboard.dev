import React from "react";
import styled from "styled-components";

export default (props: { value: string; setValue: Function }) => {
    return (
        <ChangeUsername>
            <h1>Change Username</h1>
            <input
                type="text"
                onChange={(e) => props.setValue(e.target.value)}
                value={props.value}
                minLength={3}
                maxLength={16}
                placeholder="HackMaster"
            />
        </ChangeUsername>
    );
};

const ChangeUsername = styled.div`
    > input {
        width: 100%;
        padding: 5%;
        font-size: 1em;
        border: 1px solid ${(props) => props.theme.accent};
        outline: none;
    }
`;
