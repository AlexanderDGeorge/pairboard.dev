import { firestore } from "./firebase";
import { User } from "./user";

export interface Search extends NewSearchObject {
    active: boolean;
    username: string;
    userScore: number;
    userPhotoURL: string;
    createdAt: string;
}

export interface NewSearchObject {
    [index: string]: any;
    language: string;
    difficulty: string;
    tags: Array<string>;
    description: string;
}

export async function createSearchDocument(
    currentUser: User,
    newSearchObject?: NewSearchObject
) {
    if (!newSearchObject) return;
    if (currentUser.searchId) {
        updateSearchDocument(newSearchObject, currentUser);
    } else {
        const userRef = firestore().collection("users").doc(currentUser.uid);
        await firestore()
            .collection("searches")
            .add({
                ...newSearchObject,
                createdAt: new Date(),
                active: true,
                userScore: currentUser.score,
                username: currentUser.username,
                userPhotoURL: currentUser.photoURL,
            })
            .then((data) =>
                userRef.update({
                    searchId: data.id,
                })
            );
    }
}

async function updateSearchDocument(
    newSearchObject: NewSearchObject,
    currentUser: User
) {
    const searchRef = firestore()
        .collection("searches")
        .doc(currentUser.searchId);
    await searchRef.update({
        ...newSearchObject,
        createdAt: new Date(),
        active: true,
        userScore: currentUser.score,
        username: currentUser.username,
        userPhotoURL: currentUser.photoURL,
    });
}

export async function fetchSearchDocuments(searchParams?: NewSearchObject) {
    if (!searchParams) return;
    const { language } = searchParams;
    const searchesRef = firestore()
        .collection("searches")
        .where("active", "==", true)
        .where("language", "==", language)
        .orderBy("createdAt", "asc")
        .limit(10);
    const searchesDoc = await searchesRef.get();
    return [...searchesDoc.docs.map((doc) => ({ id: doc.id, ...doc.data() }))];
}
