import { auth, firestore } from "./firebase";

export interface Search {
    language: string;
    difficulty: string;
    tag: string;
    user: string;
}

export interface SearchParams {
    language: string;
    difficulty: string;
    tag: string;
    score: number;
    experience: string;
}

export const createSearch = async (searchParams: SearchParams) => {
    const userRef = firestore().collection("users").doc(auth.currentUser?.uid);
    const userDoc = (await userRef.get()).data();
    if (userDoc?.search) {
        const searchRef = firestore()
            .collection("searches")
            .doc(userDoc.search);
        searchRef.delete();
    }
    const searchRef = await firestore()
        .collection("searches")
        .add({ ...searchParams, user: userRef.id });
    userRef.update({
        search: searchRef.id,
    });
    console.log("search added");
};
