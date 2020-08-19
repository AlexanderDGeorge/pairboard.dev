import { useState, useEffect } from "react";

/*
    SEARCHING / MATCHMAKING

    - User selects params and creates or updates a search document
    - User is presented with other search documents of the same type
    - When user selects a search document, active on both docs is set to false
    - User is prompted with confirm to pair
    - A pair document is then created with both users
    - If successful, search documents are deleted

*/

const initialSearch = {
    language: "Any",
    difficulty: "Any",
    tags: [],
    score: 0,
    experience: "Any",
};

function getSavedSearch() {
    const savedSearch = JSON.parse(localStorage.getItem("pairboardiosearch"));
    return savedSearch ? savedSearch : initialSearch;
}

export default () => {
    const [searchParams, setSearchParams] = useState(() => {
        return getSavedSearch();
    });

    useEffect(() => {
        console.log(searchParams);
        localStorage.setItem("pairboardiosearch", JSON.stringify(searchParams));
    }, [searchParams]);

    return [searchParams, setSearchParams];
};
