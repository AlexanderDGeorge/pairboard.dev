export interface User {
    uid: string;
    bio: string;
    darkMode: string;
    email: string;
    firstname: string;
    lastname: string;
    pairs: Array<string>;
    photoURL: string;
    score: number;
    sessionId?: string;
    status: string;
    streak: number;
    username: string;
}

export interface UserLite {
    uid: User["uid"];
    firstname: User["firstname"];
    lastname: User["lastname"];
    photoURL: User["photoURL"];
    score: User["score"];
    username: User["username"];
}
