import { auth, firestore } from "./firebase";

export interface Search extends NewSearchObject {
    active: boolean;
    userId: string;
    createdAt: Date;
}

export interface NewSearchObject {
    language: string;
    easy: boolean;
    medium: boolean;
    hard: boolean;
    tag1: string;
    tag2: string;
    tag3: string;
    comment: string;
}
