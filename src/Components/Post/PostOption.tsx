import React from "react";
import styled from "styled-components";

interface PostOptionProps {
    filter: string;
    options: Array<string>;
    postParams: any;
    setPostParams: Function;
}

export default (props: PostOptionProps) => {
    const { filter, options, postParams, setPostParams } = props;

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        e.persist();
        if (setPostParams) {
            setPostParams({
                ...postParams,
                [filter]: e.target.value,
            });
        } else {
            // [TODO]: handle error
        }
    }

    return (
        <PostOption>
            <label>{filter}</label>
            <select
                name="options"
                id="options"
                defaultValue={postParams ? postParams[filter] : ""}
                onChange={handleChange}
            >
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </PostOption>
    );
};

const PostOption = styled.div`
    position: relative;
    margin: 2% 0;
    > label {
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
