import { firestore } from "./firebase";
import { User } from "./user";

export interface Post extends NewPost {
    userId: User["uid"];
    username: User["username"];
    userScore: User["score"];
    userPhotoURL: User["photoURL"];
    createdAt: Date;
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
        const postDoc = await firestore()
            .collection("posts")
            .add({
                ...newPost,
                createdAt: new Date(),
                userId: user.uid,
                username: user.username,
                userScore: user.score,
                userPhotoURL: user.photoURL,
            });
        userRef.update({
            searchId: postDoc.id,
        });
    }
}

async function updatePostDocument(user: User, newPost: NewPost) {
    const postRef = firestore().collection("posts").doc(user.searchId);
    await postRef.update({
        ...newPost,
        createdAt: new Date(),
        userId: user.uid,
        username: user.username,
        userScore: user.score,
        userPhotoURL: user.photoURL,
    });
}

export async function fetchPosts() {
    const postsRef = await firestore()
        .collection("posts")
        .orderBy("createdAt", "desc")
        .get();
    return [...postsRef.docs.map((doc) => doc.data())];
}
