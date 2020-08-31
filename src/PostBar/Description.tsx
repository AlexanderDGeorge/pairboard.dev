import React from "react";
import styled from "styled-components";
import { NewSession } from "../types/session_types";

export default (props: { postParams: NewSession; setPostParams: Function }) => {
    const { postParams, setPostParams } = props;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.persist();
        if (setPostParams) {
            setPostParams({
                ...postParams,
                description: e.target.value,
            });
        } else {
            // [TODO]: Handle error
        }
    }

    return (
        <PostDescription>
            <h4>description</h4>
            <input
                maxLength={140}
                placeholder="add optional description"
                value={postParams?.description}
                onChange={handleChange}
            />
        </PostDescription>
    );
};

const PostDescription = styled.div`
    position: relative;
    margin: 2% 0;
    > h4 {
        position: absolute;
        font-weight: 100;
        color: ${(props) => props.theme.verydark};
    }
    > input {
        height: 60px;
        width: 240px;
        border: 1px solid ${(props) => props.theme.verydark};
        padding: 5px;
        font-weight: 300;
        background-color: ${(props) => props.theme.white};
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s linear;
        &:hover {
            transition: all 0.2s linear;
            border: 1px solid ${(props) => props.theme.accent};
        }
    }
`;
