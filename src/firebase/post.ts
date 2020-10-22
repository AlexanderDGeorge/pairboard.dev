import { firestore, fieldValue } from "./firebase";
import {
    CommentSchema,
    LightUserSchema,
    PostSchema,
    UserSchema,
} from "./schema";

export async function createPost(
    host: LightUserSchema,
    title: PostSchema["title"],
    description: PostSchema["description"],
    difficulty: PostSchema["difficulty"],
    language: PostSchema["language"],
    maxCapacity: PostSchema["maxCapacity"],
    sessionDate: PostSchema["sessionDate"],
    sessionTime: PostSchema["sessionTime"]
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
        sessionDate,
        sessionTime,
        title,
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

export function deletePost(post: PostSchema) {
    firestore().collection("postComments").doc(post.commentsId).delete();
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
