import { auth, firestore } from "./firebase";

export interface Search extends SearchParams {
    user: string;
}

export interface SearchParams {
    language: string;
    difficulty: string;
    tag?: string;
    score: number;
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
