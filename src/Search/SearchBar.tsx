import React, { useContext } from "react";
import styled from "styled-components";
import SearchOption from "./SearchOption";
import BoardDescription from "./BoardDescription";
import { LANGUAGES, DIFFICULTIES, TAGS } from "../util/constants";
import { UserContext } from "../Application";
import { createSearchDocument } from "../firebase/search";

interface SearchBarProps {
    searchParams: any;
    setSearchParams: Function;
    triggerSearch: Function;
}

export default (props: SearchBarProps) => {
    const { searchParams, setSearchParams, triggerSearch } = props;
    const currentUser = useContext(UserContext);

    async function handleClick() {
        if (currentUser) {
            await createSearchDocument(searchParams, currentUser);
            triggerSearch();
        }
    }

    return (
        <SearchBar>
            <SearchOption
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                filter="language"
                options={LANGUAGES}
            />
            <SearchOption
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                filter="difficulty"
                options={DIFFICULTIES}
            />
            <SearchOption
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                filter="tag"
                options={TAGS}
            />
            <BoardDescription setSearchParams={setSearchParams} />
            <SearchButton onClick={handleClick}>Search</SearchButton>
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
