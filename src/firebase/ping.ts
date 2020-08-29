import { firestore, fieldValue } from "./firebase";
import { User } from "./user";

export interface Ping {
    ownerId: User["uid"];
    userId: User["uid"];
    username: User["username"];
    userScore: User["score"];
    userPhotoURL: User["photoURL"];
}

export async function pingPostOwner(ping: Ping) {
    const { ownerId, userId, username, userScore, userPhotoURL } = ping;
    const ownerRef = firestore().collection("users").doc(ownerId);
    ownerRef.update({
        ping: {
            userId,
            username,
            userScore,
            userPhotoURL,
        },
    });
}

export async function deletePing(userId: User["uid"]) {
    const userRef = firestore().collection("users").doc(userId);
    await userRef.update({
        ping: fieldValue.delete(),
    });
}
