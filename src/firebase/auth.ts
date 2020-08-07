import { auth, firestore, githubProvider } from "./firebase";

export async function handleAuth() {
    try {
        const { user } = await auth.signInWithPopup(githubProvider);
        if (user) {
            createUserDocument(user);
        } else {
            // handle error
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function createUserDocument(user: firebase.User) {
    const userRef = firestore().collection("users").doc(user.uid);
    const userDoc = await userRef.get();
    if (userDoc.exists) {
        console.log("User document already exists");
    } else {
        console.log("Creating user document");
        const { uid, photoURL, email } = user;
        userRef.set({
            uid,
            photoURL,
            email,
            darkMode: "auto",
            status: "online",
            score: 0,
            sessions: [],
            friends: [],
        });
    }
}

export function signOut() {
    auth.signOut();
}
