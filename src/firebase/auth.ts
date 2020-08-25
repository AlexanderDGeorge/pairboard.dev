import { auth, firestore, githubProvider } from "./firebase";
import { User } from "./user";

export interface SignUpValues {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export async function loginWithGithub() {
    try {
        const { user } = await auth.signInWithPopup(githubProvider);
        // handle if no user doc (needs to signup)
        if (user) {
            console.log(user);
        } else {
            // handle error
        }
    } catch (error) {
        console.error(error.message);
    }
}

export async function login(email: User["email"], password: string) {
    await auth.signInWithEmailAndPassword(email, password);
}

export async function signupWithGithub(
    username: string,
    firstname: string,
    lastname: string
) {
    try {
        const { user } = await auth.signInWithPopup(githubProvider);
        if (user) {
            createUserDocument(user, username, firstname, lastname);
        } else {
            // handle error
        }
    } catch (error) {
        console.error(error.message);
    }
}

export async function signup(signUpValues: SignUpValues) {
    const { email, password, username, firstname, lastname } = signUpValues;
    try {
        const { user } = await auth.createUserWithEmailAndPassword(
            email,
            password
        );
        if (user) {
            console.log(user);
            createUserDocument(user, username, firstname, lastname);
        } else {
            // handle error
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function createUserDocument(
    user: firebase.User,
    username: string,
    firstname: string,
    lastname: string
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
            bio: "",
            darkMode: "Auto",
            email,
            firstname,
            lastname,
            pairs: [],
            photoURL:
                user.photoURL ||
                "https://blacklivesmatter.com/wp-content/uploads/2017/07/BLM-logo.png",
            score: 0,
            status: "online",
            streak: 0,
            username,
        });
    }
}

export async function signOut() {
    await auth.signOut();
}

export async function checkForValidUsername(username: string) {
    if (!username) return;
    const usersRef = await firestore()
        .collection("users")
        .where("username", "==", username)
        .get();
    return usersRef.empty;
}

export async function checkForValidEmail(email: string) {
    if (!email) return;
    const usersRef = await firestore()
        .collection("users")
        .where("email", "==", email)
        .get();
    return usersRef.empty;
}
