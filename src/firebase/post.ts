import { DevPublicProfile } from '../Devs/devSchema';
import { firestore, fieldValue } from '../firebase';
import { PostSchema } from '../Posts/postSchema';

export async function joinPost(
    uid: DevPublicProfile['uid'],
    postId: PostSchema['id'],
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
