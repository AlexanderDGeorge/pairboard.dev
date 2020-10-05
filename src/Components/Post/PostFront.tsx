import React from "react";
import styled from "styled-components";
import { PostSchema } from "../../firebase/schema";
import getDateToNow from "../../util/getDateToNow";

export default (props: { post: PostSchema }) => {
    const {
        active,
        createdAt,
        description,
        difficulty,
        language,
        maxCapacity,
        participants,
    } = props.post;

    const dateToNow = getDateToNow(new Date(createdAt));

    return (
        <PostInfo>
            <div>
                <Language>
                    {language} | {difficulty}
                </Language>
                {active ? <Active /> : <DateToNow>{dateToNow}</DateToNow>}
            </div>
            <PostDescription>{description}</PostDescription>
            <Participants>
                {participants.length} / {maxCapacity}
            </Participants>
        </PostInfo>
    );
};

const PostInfo = styled.div`
    height: 100%;
    width: 100%;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    > div {
        padding-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

const PostDescription = styled.p`
    grid-area: description;
`;

const Language = styled.h4`
    grid-area: language;
    font-weight: 500;
`;

const DateToNow = styled.h6`
    grid-area: date;
    font-weight: 100;
`;

const Active = styled.div`
    grid-area: date;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.green};
`;

const Participants = styled.div`
    position: absolute;
    bottom: 0;
    right: 10px;
    font-size: 0.8em;
    font-weight: 100;
`;
