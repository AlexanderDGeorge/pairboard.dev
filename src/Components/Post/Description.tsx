import React from "react";
import styled from "styled-components";

export default (props: { postParams: any; setPostParams: Function }) => {
    const { postParams, setPostParams } = props;

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
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
            <textarea
                minLength={4}
                maxLength={140}
                placeholder="leave a descriptive description!"
                value={postParams?.description}
                onChange={handleChange}
                required
            />
        </PostDescription>
    );
};

const PostDescription = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 10px;
    > h4 {
        position: absolute;
        font-weight: 100;
        color: ${(props) => props.theme.verydark};
    }
    > textarea {
        min-height: 120px;
        width: 100%;
        border: 1px solid ${(props) => props.theme.verydark};
        padding: 20px 5px 5px 5px;
        resize: none;
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
