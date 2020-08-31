import { useState, useEffect } from "react";
import { NewSession } from "../types/session_types";

const defaultPost = {
    language: "Any",
    difficulty: "Easy",
    description: "",
    tags: [],
};

function getPostFromLocalStorage() {
    const localStoragePost = localStorage.getItem("pbiopost");
    return localStoragePost ? JSON.parse(localStoragePost) : defaultPost;
}

export default function useSearchState(): [NewSession, Function] {
    const [postParams, setPostParams] = useState<NewSession>(() => {
        return getPostFromLocalStorage();
    });

    useEffect(() => {
        localStorage.setItem("pbiopost", JSON.stringify(postParams));
    }, [postParams]);

    return [postParams, setPostParams];
}
