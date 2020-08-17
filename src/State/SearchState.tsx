import { useEffect, useState, useContext } from "react";
import { Search } from "../firebase/search";
import { UserContext } from "../Application";
import { firestore } from "firebase";

export const defaultSearch = {
    user: "",
    active: false,
    language: "Any",
    difficulty: "Any",
    tag: "Any",
    score: 0,
    experience: "Any",
};

export default () => {
    const currentUser = useContext(UserContext);
    const [currentSearch, setCurrentSearch] = useState<Search>(defaultSearch);
    const [searchId, setSearchId] = useState<string | undefined>(undefined);
    const search = currentUser?.search;
    console.log(currentUser);

    useEffect(() => {
        console.log(currentUser);
        if (currentUser?.search) {
            setSearchId(currentUser.search);
        }
    }, [currentUser, search]);

    useEffect(() => {
        let unsubscribe = () => {};
        if (searchId) {
            unsubscribe = firestore()
                .collection("searches")
                .doc(searchId)
                .onSnapshot((snapshot) => {
                    if (snapshot.exists) {
                        const data = snapshot.data();
                        if (data) {
                            setCurrentSearch({
                                user: data.user,
                                active: data.active,
                                language: data.langauge,
                                difficulty: data.difficulty,
                                tag: data.tag,
                                score: data.score,
                                experience: data.experience,
                            });
                        }
                    }
                });
        }
        return () => {
            unsubscribe();
        };
    }, [searchId]);

    return currentSearch;
};
