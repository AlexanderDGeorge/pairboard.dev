import { User as FirebaseUser } from "firebase";

export interface UserSchema {
    uid: FirebaseUser["uid"];
    blurb: string;
    email: string;
    firstname: string;
    lastname: string;
    photoURL: string;
    score: string;
    sessionId?: string;
    status: string;
    username: string;
}

export interface SessionSchema {
    id: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    host: UserSchema["uid"];
    language: string;
    maxCapacity: number;
    participants: Array<UserSchema["uid"]>;
    tags: Array<string>;
}
