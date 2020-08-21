import { useState, useEffect } from "react";
import { NewSearchObject } from "../firebase/search";

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
    difficulty: "Easy",
    description: "",
    tags: [""],
};

function getSavedSearch() {
    const savedSearch = JSON.parse(
        localStorage.getItem("pairboardiosearch") || ""
    );
    return savedSearch ? savedSearch : initialSearch;
}

export default function useSearchState(): [NewSearchObject, Function] {
    const [searchParams, setSearchParams] = useState<NewSearchObject>(() => {
        return getSavedSearch();
    });

    useEffect(() => {
        // will this fire multiple times if useSearchState is called in multiple locations?
        localStorage.setItem("pairboardiosearch", JSON.stringify(searchParams));
    }, [searchParams]);

    return [searchParams, setSearchParams];
}
