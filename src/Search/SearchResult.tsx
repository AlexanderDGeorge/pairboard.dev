import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Search } from "../firebase/search";

export default (props: { result: Search }) => {
    const {
        language,
        difficulty,
        tags,
        userPhotoURL,
        username,
        userScore,
        createdAt,
        description,
    } = props.result;

    console.log(props.result);

    return (
        <SearchResult>
            <UserInfo>
                <img src={userPhotoURL} alt="" />
                <Link to={`user/${username}`}>
                    {username} | {userScore}
                </Link>
            </UserInfo>
            <Language>{language}</Language>
            <Description>{description}</Description>
        </SearchResult>
    );
};

const SearchResult = styled.div`
    height: 200px;
    min-width: 350px;
    width: calc(50% - 5px);
    margin-bottom: 10px;
    border: 1px solid ${(props) => props.theme.verydark};
    display: grid;
    grid-template-columns: 60% 5px auto;
    grid-template-rows: 20% 20% 20% 20% 20%;
    grid-template-areas:
        "userInfo . difficulty"
        "language . tags"
        "language . tags"
        "description . tags"
        "description . date";
    transition: all 0.2s linear;
    cursor: pointer;
    overflow: hidden;
    &:hover {
        transition: all 0.2s linear;
        border: 1px solid ${(props) => props.theme.accent};
        box-shadow: 0 4px 15px -8px ${(props) => props.theme.medium};
    }
    > * {
        height: 100%;
        width: 100%;
        padding: 2%;
    }
`;

const UserInfo = styled.div`
    grid-area: userInfo;
    display: flex;
    align-items: center;
    > img {
        height: 100%;
        width: auto;
        margin-right: 10px;
        border-radius: 50%;
    }
`;

const Language = styled.h2`
    grid-area: language;
`;

const Description = styled.p`
    grid-area: description;
    color: ${(props) => props.theme.medium};
`;
