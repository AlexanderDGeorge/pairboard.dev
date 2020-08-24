import React from "react";
import styled from "styled-components";

interface InputFieldProps {
    label: string;
    profileInfo: any;
    setProfileInfo: Function;
}

export default (props: InputFieldProps) => {
    const { label, profileInfo, setProfileInfo } = props;

    function handleChange(e: any) {
        e.persist();
        setProfileInfo((profileInfo: any) => ({
            ...profileInfo,
            [label]: e.target.value,
        }));
    }

    return (
        <InputField>
            <label>{label}</label>
            <input
                type="text"
                value={profileInfo[label]}
                onChange={handleChange}
            />
        </InputField>
    );
};

const InputField = styled.div`
    position: relative;
    margin: 2% 0;
    > label {
        position: absolute;
        font-weight: 100;
        color: ${(props) => props.theme.verydark};
    }
    > input {
        height: 60px;
        width: 100%;
        border: 1px solid ${(props) => props.theme.verydark};
        padding: 5px;
        font-weight: 300;
        background-color: ${(props) => props.theme.white};
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s linear;
        &:hover {
            transition: all 0.2s linear;
            border: 1px solid ${(props) => props.theme.accent};
        }
    }
`;
