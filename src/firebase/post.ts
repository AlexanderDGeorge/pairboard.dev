import { firestore, fieldValue } from "./firebase";
import {
    CommentSchema,
    LightUserSchema,
    PostSchema,
    UserSchema,
} from "./schema";

export async function createPost(
    host: LightUserSchema,
    description: PostSchema["description"],
    difficulty: PostSchema["difficulty"],
    language: PostSchema["language"],
    maxCapacity: PostSchema["maxCapacity"]
) {
    // [TODO]: could refactor to only create commentsDoc on first comment

    const commentsRef = firestore().collection("postComments").doc();
    commentsRef.set({
        id: commentsRef.id,
    });
    const postRef = firestore().collection("posts").doc();
    await postRef.set({
        id: postRef.id,
        active: true,
        commentsId: commentsRef.id,
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
    console.log("here1");
    await postRef.update({
        users: fieldValue.arrayUnion(uid),
        participants: fieldValue.arrayUnion(uid),
    });
    console.log("here2");
    await firestore().collection("users").doc(host.uid).update({
        status: "in room",
    });
    console.log("here3");
    await firestore().collection("users").doc(uid).update({
        postId: postRef.id,
        status: "in room",
    });
    console.log("here4");
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

export async function addComment(
    commentId: CommentSchema["id"],
    username: UserSchema["username"],
    content: string
) {
    const commentRef = firestore().collection("postComments").doc(commentId);
    await commentRef.update({
        comments: fieldValue.arrayUnion({
            username,
            content,
            createdAt: new Date().toString(),
        }),
    });
}

export async function deletePost(post: PostSchema) {
    firestore().collection("postComments").doc(post.commentsId).delete();
    post.users.forEach((uid: string) => {
        // [TODO]: refactor this is expensive
        firestore()
            .collection("users")
            .doc(uid)
            .update({
                posts: fieldValue.arrayRemove(post.id),
            });
    });
    await firestore().collection("posts").doc(post.id).delete();
}
