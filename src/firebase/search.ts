import { auth, firestore } from "./firebase";

export interface Search extends SearchParams {
    user: string;
    active: boolean;
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
        await updateSearch(searchParams, userDoc.search);
    } else {
        const searchRef = await firestore()
            .collection("searches")
            .add({ ...searchParams, user: userRef.id, createdAt: new Date() });
        userRef.update({
            search: searchRef.id,
        });
    }
};

const updateSearch = async (searchParams: SearchParams, searchId: string) => {
    const { language, difficulty, tag, score, experience } = searchParams;
    const searchRef = firestore().collection("searches").doc(searchId);
    console.log("in updateSearch");
    searchRef.update({
        active: true,
        createdAt: new Date(),
        language,
        difficulty,
        tag,
        score,
        experience,
    });
};

export const turnOffSearch = async (searchId: string) => {
    const searchRef = firestore().collection("searches").doc(searchId);
    await searchRef.update({
        active: false,
    });
};

export const fetchPaginatedSection = async (
    limit: number,
    searchParams: SearchParams,
    last?: number
) => {
    // how to unsub
    const { language, difficulty, tag, score, experience } = searchParams;
    const searchesRef = firestore()
        .collection("searches")
        .where("active", "==", true)
        .where("language", "==", language)
        .where("difficulty", "==", difficulty)
        .where("tag", "==", tag)
        .where("score", "==", score)
        .where("experience", "==", experience)
        .orderBy("createdAt", "desc")
        .limit(limit);
    const searchesDoc = await searchesRef.get();
    console.log(searchesDoc);
    return [...searchesDoc.docs.map((doc) => ({ id: doc.id, ...doc.data() }))];
};
