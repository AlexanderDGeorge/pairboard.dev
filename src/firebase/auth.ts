import { auth, firestore, githubProvider } from "./firebase";

export async function handleAuth() {
    try {
        const { user } = await auth.signInWithPopup(githubProvider);
        if (user) {
            console.log(user);
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
        console.log(user);
        const { uid, photoURL, email } = user;
        userRef.set({
            uid,
            bio: "insert bio here...",
            darkMode: "auto",
            email,
            experience: "Beginner",
            friends: [],
            links: [],
            photoURL,
            score: 0,
            search: "",
            sessions: [],
            status: "online",
        });
    }
}

export async function signOut() {
    const userRef = firestore().collection("users").doc(auth.currentUser?.uid);
    userRef.update({
        search: "",
    });
    await auth.signOut();
}
