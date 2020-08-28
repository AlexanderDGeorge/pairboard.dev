import { firestore } from "./firebase";
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
