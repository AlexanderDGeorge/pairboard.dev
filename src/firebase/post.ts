import { firestore, fieldValue } from "./firebase";
import { PostSchema, UserSchema } from "./schema";

export async function createPost(
    uid: UserSchema["uid"],
    description: PostSchema["description"],
    difficulty: PostSchema["difficulty"],
    language: PostSchema["language"],
    maxCapacity: PostSchema["maxCapacity"],
    tags: PostSchema["tags"]
) {
    const postRef = firestore().collection("posts").doc();
    await postRef.set({
        id: postRef.id,
        hostId: uid,
        description,
        difficulty,
        language,
        maxCapacity,
        tags,
    });
    firestore().collection("users").doc(uid).update({
        postId: postRef.id,
    });
}

export async function joinPost(
    uid: UserSchema["uid"],
    postId: PostSchema["id"]
) {
    // [TODO]: if user has post it needs to be deleted
    const postRef = firestore().collection("posts").doc(postId);
    await postRef.update({
        participants: fieldValue.arrayUnion(uid),
    });
    firestore().collection("users").doc(uid).update({
        postId: postRef.id,
    });
}

export async function fetchPosts() {
    const postsRef = await firestore().collection("posts").get();
}
