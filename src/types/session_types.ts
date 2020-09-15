import { UserLite } from "./user_types";

export interface Session extends NewSession {
    id: string;
    createdAt: string;
    author: UserLite;
    users: Array<UserLite["uid"]>;
}

export interface NewSession {
    // [TODO]: make this safer
    [field: string]: any;
    language: string;
    difficulty: string;
    tags: Array<string>;
    description: string;
}
