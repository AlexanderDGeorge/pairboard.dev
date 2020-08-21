import { useState } from "react";
import { fetchSearchDocuments, NewSearchObject } from "../firebase/search";

// [TODO]: refactor this in the future
// include scroll pagination

export default function useSearch(searchParams: NewSearchObject) {
    const [searchResults, setSearchResults] = useState<Array<any>>([]);

    const triggerSearch = async () => {
        const searchDocs = await fetchSearchDocuments(searchParams);
        setSearchResults(searchDocs);
    };

    return { searchResults, triggerSearch };
}
