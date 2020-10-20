import React from "react";
import { FaPlus } from "react-icons/fa";
import styled from "styled-components";

export default () => {
    return (
        <CreatePost>
            <h1>Create a Post</h1>
            <div>
                <FaPlus />
            </div>
        </CreatePost>
    );
};

const CreatePost = styled.div`
    width: 100%;
    > h1 {
        width: 350px;
        margin-bottom: 10px;
        border-bottom: 1px solid ${(props) => props.theme.light};
        font-weight: 500;
    }
    > div {
        height: 200px;
        width: 300px;
        margin: 0 10px 10px 0;
        border: 1px solid ${(props) => props.theme.verydark};
        border-radius: 5px;
        padding: 10px 10px 0 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
            transition: all linear 0.2s;
            border: 1px solid ${(props) => props.theme.accent};
            box-shadow: 0 0 20px -8px ${(props) => props.theme.verydark};
        }
    }
`;
