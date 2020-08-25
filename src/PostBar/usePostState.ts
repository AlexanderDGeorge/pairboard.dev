import { useState, useEffect } from "react";
import { NewPost } from "../firebase/post";

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

export default function useSearchState(): [NewPost, Function] {
    const [postParams, setPostParams] = useState<NewPost>(() => {
        return getPostFromLocalStorage();
    });

    useEffect(() => {
        localStorage.setItem("pbiopost", JSON.stringify(postParams));
    }, [postParams]);

    return [postParams, setPostParams];
}
