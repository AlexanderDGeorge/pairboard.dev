import { firestore, auth } from "./firebase";
import { UserSchema } from "./schema";

const userRef = (uid: UserSchema["uid"]) =>
    firestore().collection("users").doc(uid);

export async function fetchUserDocument(uid: UserSchema["uid"]) {
    try {
        const userDoc = await userRef(uid).get();
        return { ...userDoc.data() };
    } catch (error) {
        console.error(error.message);
    }
}

export async function fetchUserDocFromUsername(username: UserSchema["uid"]) {
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

export async function updateDarkModeSetting(darkMode: UserSchema["uid"]) {
    const userRef = firestore().collection("users").doc(auth.currentUser?.uid);
    try {
        await userRef.update({
            darkMode,
        });
    } catch (error) {
        console.error(error.message);
    }
}

export async function updateUserDoc(
    blurb: UserSchema["blurb"],
    username: UserSchema["username"]
) {
    const userRef = firestore().collection("users").doc(auth.currentUser?.uid);
    try {
        await userRef.update({
            blurb,
            username,
        });
    } catch (error) {
        console.error(error.message);
    }
}

export async function searchForUsername(search: string) {
    const endTerm = search.trim().substr(0, search.length).concat("~");
    const usersRef = firestore()
        .collection("users")
        .orderBy("username")
        .startAt(search);
    // .endAt(endTerm);
    console.log(endTerm);
    const usernames = await usersRef.get();
    console.log(usernames);
    if (usernames.empty) {
        return [];
    } else {
        return usernames.docs.map((doc) => doc.data());
    }
}
