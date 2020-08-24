import React from "react";
import styled from "styled-components";

export default (props: { label: string; type?: string }) => {
    const { label, type } = props;

    return (
        <InputField>
            <label htmlFor={label}>{label}</label>
            <input type={type ? type : "text"} autoComplete={label} />
        </InputField>
    );
};

const InputField = styled.div`
    position: relative;
    width: 100%;
    > label {
        position: absolute;
        font-weight: 100;
        color: ${(props) => props.theme.verydark};
    }
    > input {
        height: 60px;
        width: 100%;
        margin-top: 5px;
        border: 1px solid ${(props) => props.theme.verydark};
        padding: 2%;
        font-size: 1em;
        outline: none;
        transition: all 0.2s linear;
        &:hover {
            transition: all 0.2s linear;
            border: 1px solid ${(props) => props.theme.accent};
        }
    }
`;
