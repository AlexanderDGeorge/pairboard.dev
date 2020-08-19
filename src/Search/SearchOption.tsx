import React from "react";
import styled from "styled-components";

interface SearchOptionProps {
    filter: string;
    options: Array<string | number>;
    setSearchParams: Function;
}

export default (props: SearchOptionProps) => {
    const { filter, options, setSearchParams } = props;

    function handleChange(e: any) {
        e.persist();
        setSearchParams((searchParams: any) => ({
            ...searchParams,
            [filter]: e.target.value,
        }));
    }

    return (
        <SearchOption>
            <h4>{filter}</h4>
            <select name="options" id="options" onChange={handleChange}>
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </SearchOption>
    );
};

const SearchOption = styled.div`
    position: relative;
    margin: 2% 0;
    > h4 {
        position: absolute;
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
