import { firestore } from "./firebase";
import { User } from "./user";

export interface Post extends NewPost {
    username: User["username"];
    userScore: User["score"];
    userPhotoURL: User["photoURL"];
    createdAt: string;
}

export interface NewPost {
    [key: string]: any;
    language: string;
    difficulty: string;
    tags: Array<string>;
    description: string;
}

export async function createPostDocument(user: User, newPost: NewPost) {
    if (user.searchId) {
        updatePostDocument(user, newPost);
    } else {
        const userRef = firestore().collection("users").doc(user.uid);
        await firestore()
            .collection("posts")
            .add({
                ...newPost,
                createdAt: new Date(),
                username: user.username,
                userScore: user.score,
                userPhotoURL: user.photoURL,
            })
            .then((data) =>
                userRef.update({
                    searchId: data.id,
                })
            );
    }
}

async function updatePostDocument(user: User, newPost: NewPost) {
    const postRef = firestore().collection("posts").doc(user.searchId);
    await postRef.update({
        ...newPost,
        createdAt: new Date(),
        username: user.username,
        userScore: user.score,
        userPhotoURL: user.photoURL,
    });
}
