import React from "react";
import styled from "styled-components";

interface DropdownProps {
    setValue: Function;
    options: Array<string>;
}

export default (props: DropdownProps) => {
    return (
        <Dropdown>
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
                {/* <option onClick={e => props.setValue(e.target.value)} value="JavaScript">JavaScript</option>
                <option onClick={e => props.setValue(e.target.value)} value="Python">Python</option>
                <option onClick={e => props.setValue(e.target.value)} value="Ruby">Ruby</option>
                <option onClick={e => props.setValue(e.target.value)} value="C++">C++</option> */}
            </select>
        </Dropdown>
    );
};

const Dropdown = styled.form`
    height: 60px;
    width: 100px;
    border: 1px dotted ${(props) => props.theme.accent};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
        border: 1px solid ${(props) => props.theme.black};
    }
    > label {
        font-weight: 300;
    }
    > select {
        height: 100%;
        width: 100%;
        font-weight: 300;
    }
`;
