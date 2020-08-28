import { firestore, auth } from "./firebase";
import { Ping } from "./ping";

export interface User {
    uid: string;
    bio: string;
    darkMode: string;
    email: string;
    firstname: string;
    lastname: string;
    pairs: Array<string>;
    photoURL: string;
    ping?: Ping;
    postId?: string;
    score: number;
    sessionId?: string;
    status: string;
    streak: number;
    username: string;
}

interface UpdateData {
    bio: string;
    username: string;
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

export async function fetchUserDocFromUsername(username: User["uid"]) {
    try {
        const userRef = firestore()
            .collection("users")
            .where("username", "==", username)
            .limit(1);
        const userCollection = await userRef.get();
        const userDoc = userCollection.docs[0].data();
        return { ...userDoc };
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

export async function updateUserDoc(updateData: UpdateData) {
    const userRef = firestore().collection("users").doc(auth.currentUser?.uid);
    try {
        await userRef.update({
            ...updateData,
        });
    } catch (error) {
        console.error(error.message);
    }
}
