import { firestore, auth } from "./firebase";

export interface User {
    uid: string;
    photoURL: string;
    email: string;
    username?: string;
    darkMode: string;
    status: string;
    score: number;
    sessions: Array<string>;
    friends: Array<string>;
}

export async function fetchUserDocument(uid: User["uid"]) {
    const userRef = firestore().collection("users").doc(uid);
    try {
        const userDoc = await userRef.get();
        return { ...userDoc.data() };
    } catch (error) {
        console.error(error.message);
    }
}

export async function updateDarkModeSetting(darkMode: User["uid"]) {
    const userRef = firestore().collection("users").doc(auth.currentUser?.uid);
    try {
        await userRef.update({
            darkMode,
        });
    } catch (error) {
        console.error(error.message);
    }
}
