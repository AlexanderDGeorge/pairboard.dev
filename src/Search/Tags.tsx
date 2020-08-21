import React from "react";
import styled from "styled-components";

export default (props: { tags: Array<string> }) => {
    return (
        <Tags>
            {props.tags.map((tag, i) => (
                <Tag tag={tag} key={i} />
            ))}
        </Tags>
    );
};

const Tags = styled.div`
    grid-area: tags;
`;

function Tag(props: { tag: string }) {
    return <StyledTag>{props.tag}</StyledTag>;
}

const StyledTag = styled.div``;
