import React, { useContext } from "react";
import styled from "styled-components";
import SearchOption from "./SearchOption";
import BoardDescription from "./BoardDescription";
import { LANGUAGES, DIFFICULTIES, TAGS } from "../util/constants";
import { UserContext, SearchContext } from "../Application";
import { createSearchDocument } from "../firebase/search";

export default (props: { triggerSearch: Function }) => {
    const { triggerSearch } = props;
    const [searchParams] = useContext(SearchContext);
    const currentUser = useContext(UserContext);

    async function handleClick() {
        if (currentUser) {
            await createSearchDocument(currentUser, searchParams);
            triggerSearch();
        }
    }

    return (
        <SearchBar>
            <SearchOption filter="language" options={LANGUAGES} />
            <SearchOption filter="difficulty" options={DIFFICULTIES} />
            <SearchOption filter="tag" options={TAGS} />
            <BoardDescription />
            <SearchButton onClick={handleClick}>Post</SearchButton>
        </SearchBar>
    );
};

const SearchBar = styled.div`
    position: relative;
    min-height: 140px;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.verylight};
    padding: 2% 5%;
    background-color: ${(props) => props.theme.white};
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 15px -8px ${(props) => props.theme.medium};
`;

const SearchButton = styled.button`
    height: 60px;
    width: 120px;
    padding: 10px;
    font-size: 1em;
    font-weight: 600;
    background-color: ${(props) => props.theme.verydark};
    color: ${(props) => props.theme.verylight};
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: color 0.2s linear;
    &:hover {
        transition: color 0.2s linear;
        color: ${(props) => props.theme.white};
    }
`;
