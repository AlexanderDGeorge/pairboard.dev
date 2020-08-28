import { firestore } from "./firebase";
import { User } from "./user";

interface Ping {
    ownerId: User["uid"];
    userId: User["uid"];
    username: User["username"];
    userScore: User["score"];
    userPhotoURL: User["photoURL"];
}

export async function pingPostOwner() {}
