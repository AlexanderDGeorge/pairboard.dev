import React, { useRef } from "react";
import styled from "styled-components";

export default () => {
    const bio = useRef("");

    return (
        <BioEdit>
            <h1>Edit Bio</h1>
            <textarea
                onChange={(e) => (bio.current = e.target.value)}
                cols={30}
                rows={5}
                maxLength={140}
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
