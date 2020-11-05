import { firestore, fieldValue } from "./firebase";
import {
    LightUserSchema,
    PostSchema,
    UserSchema,
} from "./schema";

export async function createPost(
    host: LightUserSchema,
    title: PostSchema["title"],
    type: PostSchema["type"],
    description: PostSchema["description"],
    difficulty: PostSchema["difficulty"],
    language: PostSchema["language"],
    maxCapacity: PostSchema["maxCapacity"],
    sessionDate: PostSchema["sessionDate"],
    sessionStart: PostSchema["sessionStart"],
    sessionEnd: PostSchema["sessionEnd"]
) {
    const postRef = firestore().collection("posts").doc();
    await postRef.set({
        id: postRef.id,
        active: true,
        createdAt: new Date().toString(),
        description,
        difficulty,
        host,
        language,
        maxCapacity,
        participants: [],
        sessionDate,
        sessionStart,
        sessionEnd,
        title,
        type,
    });
}

export async function joinPost(
    uid: UserSchema["uid"],
    postId: PostSchema["id"]
) {
    const postRef = firestore().collection("posts").doc(postId);
    await postRef.update({
        users: fieldValue.arrayUnion(uid),
        participants: fieldValue.arrayUnion(uid),
    });
    // [TODO]: needs notification refactoring
    // send notification here
    await firestore().collection("users").doc(uid).update({
        postId: postRef.id,
        status: "in room",
    });
}

export async function fetchPosts() {
    const postsRef = await firestore().collection("posts").get();
    return postsRef.docs.map((post) => post.data());
}

export async function closePost(postId: PostSchema["id"]) {
    const postRef = firestore().collection("posts").doc(postId);
    await postRef.update({
        active: false,
    });
}

export function deletePost(post: PostSchema) {
    post.participants.forEach((uid: string) => {
        // [TODO]: refactor this is expensive
        firestore()
            .collection("users")
            .doc(uid)
            .update({
                posts: fieldValue.arrayRemove(post.id),
            });
    });
    firestore().collection("posts").doc(post.id).delete();
}
