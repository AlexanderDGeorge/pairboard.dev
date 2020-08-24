import React from "react";
import styled from "styled-components";

interface InputProps {
    label: string;
    error?: string;
    checkForErrors: Function;
}

export default (props: InputProps & React.HTMLProps<HTMLInputElement>) => {
    const { label, error, checkForErrors, type, placeholder } = props;

    return (
        <Input>
            <label>{label}</label>
            <input
                type={type}
                onBlur={() => checkForErrors(label)}
                style={error ? { borderColor: "#FF890A" } : {}}
                placeholder={placeholder}
            />
            {error ? <p>{error}</p> : null}
        </Input>
    );
};

const Input = styled.div`
    position: relative;
    height: 60px;
    min-width: 240px;
    width: 100%;
    max-width: 480px;
    > label {
        position: absolute;
        font-weight: 100;
        color: ${(props) => props.theme.verydark};
    }
    > input {
        height: 100%;
        width: 100%;
        border: 1px solid ${(props) => props.theme.verydark};
        padding: 20px;
        font-size: 1em;
        outline: none;
        transition: border 0.2s linear;
        &:hover {
            transition: border 0.2s linear;
            border: 1px solid ${(props) => props.theme.accent};
        }
    }
    > p {
        position: absolute;
        font-weight: 500;
        color: ${(props) => props.theme.orange};
        bottom: 0;
    }
`;
