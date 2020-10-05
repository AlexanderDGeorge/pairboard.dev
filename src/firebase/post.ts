import { firestore, fieldValue } from "./firebase";
import { LightUserSchema, PostSchema, UserSchema } from "./schema";

export async function createPost(
    host: LightUserSchema,
    description: PostSchema["description"],
    difficulty: PostSchema["difficulty"],
    language: PostSchema["language"],
    maxCapacity: PostSchema["maxCapacity"]
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
        participants: [host.uid],
    });
    firestore()
        .collection("users")
        .doc(host.uid)
        .update({
            postId: postRef.id,
            posts: fieldValue.arrayUnion(postRef.id),
        });
}

export async function joinPost(
    uid: UserSchema["uid"],
    postId: PostSchema["id"],
    host: PostSchema["host"]
) {
    // [TODO]: if user has post it needs to be deleted
    const postRef = firestore().collection("posts").doc(postId);
    await postRef.update({
        users: fieldValue.arrayUnion(uid),
        participants: fieldValue.arrayUnion(uid),
    });
    await firestore().collection("users").doc(host.uid).update({
        status: "in room",
    });
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
