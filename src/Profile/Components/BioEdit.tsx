import React from "react";
import styled from "styled-components";

export default (props: { value: string; setValue: Function }) => {
    return (
        <BioEdit>
            <h1>Edit Bio</h1>
            <textarea
                onChange={(e) => props.setValue(e.target.value)}
                value={props.value}
                cols={30}
                rows={5}
                maxLength={140}
                placeholder="Insert Bio Here..."
            ></textarea>
        </BioEdit>
    );
};

const BioEdit = styled.div`
    display: flex;
    flex-direction: column;
    > h1 {
        margin-bottom: 20px;
        font-weight: 100;
    }
    > textarea {
        width: 100%;
        border: 1px solid ${(props) => props.theme.accent};
        padding: 5%;
        outline: none;
        font-size: 1em;
    }
`;
