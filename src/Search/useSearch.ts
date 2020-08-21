import { useState, useContext } from "react";
import { fetchSearchDocuments } from "../firebase/search";
import { SearchContext } from "../Application";

// [TODO]: refactor this in the future
// include scroll pagination

export default function useSearch() {
    const [searchParams] = useContext(SearchContext);
    const [searchResults, setSearchResults] = useState<Array<any> | undefined>(
        undefined
    );

    const triggerSearch = async () => {
        const searchDocs = await fetchSearchDocuments(searchParams);
        if (searchDocs) {
            setSearchResults(searchDocs);
        } else {
            // [TODO]: handle error
        }
    };

    return { searchResults, triggerSearch };
}
