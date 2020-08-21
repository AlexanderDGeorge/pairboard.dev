import { firestore, auth } from "./firebase";

export interface User {
    uid: string;
    bio: string;
    company?: string;
    darkMode: string;
    email: string;
    experience: string;
    friends: Array<string>;
    links: UserLinks;
    location?: string;
    photoURL: string;
    ratingMatrix?: Array<string>;
    score: number;
    searchId?: string;
    sessions: Array<string>;
    status: string;
    streak: number;
    username: string;
}

interface UserLinks {
    github?: string;
    linkedin?: string;
    portfolio?: string;
    other?: string;
}

interface UpdateData {
    bio: string;
    company?: string;
    username: string;
    location?: string;
    links?: UserLinks;
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

export async function updateExperienceLevel(experience: User["experience"]) {
    const userRef = firestore().collection("users").doc(auth.currentUser?.uid);
    try {
        await userRef.update({
            experience,
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
