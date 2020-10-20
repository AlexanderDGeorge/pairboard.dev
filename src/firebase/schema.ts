import { User as FirebaseUser } from "firebase";

export interface UserSchema {
    uid: FirebaseUser["uid"];
    blurb: string;
    connections: FirebaseUser["uid"][];
    darkMode: "auto" | "light" | "dark";
    email: string;
    emailVerified: boolean;
    firstname: string;
    githubURL?: string;
    lastname: string;
    linkedInURL?: string;
    location?: string;
    photoURL: string;
    portfolioURL?: string;
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
    commentsId: CommentSchema["id"];
    createdAt: Date;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    host: LightUserSchema;
    language: string;
    maxCapacity: number;
    participants: UserSchema["uid"][];
    tags: string[];
    title: string;
    users: UserSchema["uid"][];
}

export interface CommentSchema {
    id: string;
    comments: SingleCommentSchema[];
}

export interface SingleCommentSchema {
    username: UserSchema["username"];
    content: string;
    createdAt: string;
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
