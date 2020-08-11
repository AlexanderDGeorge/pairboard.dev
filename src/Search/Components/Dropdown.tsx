import React from "react";
import styled from "styled-components";

interface DropdownProps {
    label: string;
    setValue: Function;
    options: Array<string | number>;
}

export default (props: DropdownProps) => {
    return (
        <Dropdown>
            <h4>{props.label}</h4>
            <select
                name="options"
                id="options"
                onChange={(e) => props.setValue(e.target.value)}
            >
                {props.options.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </Dropdown>
    );
};

const Dropdown = styled.div`
    margin: 0 2% 2% 0;
    > h4 {
        margin-bottom: 10px;
        font-weight: 100;
        color: ${(props) => props.theme.verydark};
    }
    > select {
        height: 60px;
        width: 120px;
        border: 1px solid ${(props) => props.theme.verydark};
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
