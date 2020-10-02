import React, { useState } from "react";
import styled from "styled-components";
import { FaCommentAlt, FaEllipsisH } from "react-icons/fa";
import HelpText from "../Components/Animated/HelpText";

export default () => {
    const [commentHover, setCommentHover] = useState(false);
    const [ellipsisHover, setEllipsisHover] = useState(false);

    return (
        <PostExtras>
            <FaCommentAlt
                onMouseEnter={() => setCommentHover(true)}
                onMouseLeave={() => setCommentHover(false)}
            />
            <FaEllipsisH
                onMouseEnter={() => setEllipsisHover(true)}
                onMouseLeave={() => setEllipsisHover(false)}
            />
            {commentHover ? <HelpText text="view comments" /> : null}
            {ellipsisHover ? <HelpText text="view more details" /> : null}
        </PostExtras>
    );
};

const PostExtras = styled.div`
    position: absolute;
    bottom: 0;
    left: calc(50% - 25px);
    width: 50px;
    padding: 5px;
    background-color: ${(props) => props.theme.light};
    display: flex;
    align-items: center;
    justify-content: space-between;
    > svg {
        position: relative;
        background-color: transparent;
        &:hover {
            fill: ${(props) => props.theme.white};
        }
    }
`;
