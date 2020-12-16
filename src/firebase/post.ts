import { DevPublicProfile } from '../Devs/devSchema';
import { firestore, fieldValue } from '../firebase';
import { PublicPostSchema } from '../Posts/postSchema';

export async function createPost(
    host: DevPublicProfile,
    title: PublicPostSchema['title'],
    type: PublicPostSchema['type'],
    description: PublicPostSchema['description'],
    difficulty: PublicPostSchema['difficulty'],
    language: PublicPostSchema['language'],
    start: PublicPostSchema['start_date'],
) {
    const postRef = firestore().collection('posts').doc();
    await postRef.set({
        id: postRef.id,
        createdAt: new Date().toString(),
        description,
        difficulty,
        host,
        language,
        participants: [],
        start: start.toString(),
        title,
        type,
    });
    const userRef = firestore().collection('users').doc(host.uid);
    await userRef.update({
        posts: fieldValue.arrayUnion(postRef.id),
    });
}

export async function joinPost(
    uid: DevPublicProfile['uid'],
    postId: PublicPostSchema['id'],
) {
    const postRef = firestore().collection('posts').doc(postId);
    await postRef.update({
        users: fieldValue.arrayUnion(uid),
        participants: fieldValue.arrayUnion(uid),
    });
    // [TODO]: needs notification refactoring
    // send notification here
    await firestore().collection('users').doc(uid).update({
        postId: postRef.id,
        status: 'in room',
    });
}

export async function fetchPosts() {
    const postsRef = await firestore().collection('posts').get();
    return postsRef.docs.map((post) => post.data());
}
