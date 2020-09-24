import { useState, useEffect } from "react";
import { LightUserSchema } from "../../firebase/schema";

interface NewPost {
    description: string;
    difficulty: "easy" | "medium" | "hard";
    host: LightUserSchema;
    language: string;
    maxCapacity: number;
    tags: Array<string>;
}

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
