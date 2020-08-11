import { firestore, auth } from "./firebase";

export interface User {
    uid: string;
    bio: string;
    darkMode: string;
    email: string;
    experience: string;
    friends: Array<string>;
    links?: Array<string>;
    location?: string;
    photoURL: string;
    score: number;
    search?: string;
    sessions: Array<string>;
    status: string;
    username?: string;
}

const userRef = (uid: User["uid"]) => firestore().collection("users").doc(uid);

export async function fetchUserDocument(uid: User["uid"]) {
    try {
        const userDoc = await userRef(uid).get();
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
