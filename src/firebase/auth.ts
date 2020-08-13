import { auth, firestore, githubProvider } from "./firebase";
import { User } from "./user";

interface SignUpData {
    username: string;
    name: string;
    email: string;
    experience: string;
    password: string;
}

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

export async function signUp(signupData: SignUpData) {
    try {
        const { user } = await auth.createUserWithEmailAndPassword(
            signupData.email,
            signupData.password
        );
        if (user) {
            console.log(user);
            createUserDocument(user, signupData);
        } else {
            // handle error
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function createUserDocument(
    user: firebase.User,
    signupData?: SignUpData
) {
    const userRef = firestore().collection("users").doc(user.uid);
    const userDoc = await userRef.get();
    if (userDoc.exists) {
        console.log("User document already exists");
    } else {
        console.log("Creating user document");
        console.log(user);
        const { uid, email } = user;
        userRef.set({
            uid,
            bio: "insert bio here...",
            darkMode: "auto",
            email,
            experience: "Beginner",
            friends: [],
            links: [],
            photoURL: user.photoURL || "",
            score: 0,
            sessions: [],
            status: "online",
            streak: 0,
            username: signupData?.username || "",
        });
    }
}

export async function signOut(user?: User | null) {
    if (!user) return;
    if (user.search) {
        const searchRef = firestore().collection("searches").doc(user.search);
        await searchRef.delete();
    }
    const userRef = firestore().collection("users").doc(user.uid);
    await userRef.update({
        search: "",
    });
    await auth.signOut();
}
