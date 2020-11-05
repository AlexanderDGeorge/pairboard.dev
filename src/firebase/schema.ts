import { User as FirebaseUser } from "firebase";
import {
    DIFFICULTIES,
    LANGUAGES,
    POSTTYPES,
} from "../Components/Post/constants";

export interface UserSchema {
    uid: FirebaseUser["uid"];
    blurb?: string;
    connections: FirebaseUser["uid"][];
    darkMode: "auto" | "light" | "dark";
    email: string;
    emailPublic: boolean;
    emailVerified: boolean;
    firstname: string;
    githubURL?: string;
    lastname: string;
    linkedInURL?: string;
    location?: string;
    photoURL: string;
    personalURL?: string;
    postId?: string;
    posts: PostSchema["id"][];
    score: number;
    status: "online" | "offline" | "in room";
    username: string;
}

export interface LightUserSchema {
    uid: UserSchema["uid"];
    username: UserSchema["username"];
    score: UserSchema["score"];
    photoURL: UserSchema["photoURL"];
}

export interface PostSchema {
    id: string;
    active: boolean;
    author: LightUserSchema;
    createdAt: Date;
    description: string;
    difficulty: typeof DIFFICULTIES[number];
    host: LightUserSchema;
    language: typeof LANGUAGES[number];
    maxCapacity?: number;
    participants: UserSchema["uid"][];
    password?: string;
    sessionDate: Date;
    sessionEnd: Date;
    sessionStart: Date;
    title: string;
    type: typeof POSTTYPES[number];
}

export interface RoomSchema {
    id: string;
    candidates: Candidate[];
    offers: Offer[];
}

interface Candidate {
    to: UserSchema["uid"];
    from: UserSchema["uid"];
    candidates: RTCIceCandidateInit[];
}

interface Offer {
    to: UserSchema["uid"];
    from: UserSchema["uid"];
    description: RTCSessionDescriptionInit;
}
