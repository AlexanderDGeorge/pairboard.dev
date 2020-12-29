import { useState } from 'react';
import { PostSchema } from '../postSchema';

export default function useManagePost() {
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');
    const [error, setError] = useState<string | undefined>(undefined);

    async function updatePost(updatedPost: PostSchema) {}

    async function deletePost(post: PostSchema) {
        //     const postRef = firestore().collection('posts').doc(postId);
        //     postRef.delete();
        //     const userRef = firestore().collection('users').doc(uid);
        //     userRef.update({
        //         posts: fieldValue.arrayRemove(postId),
        //     });
    }

    async function openPostRoom() {}

    return { status, error, updatePost, deletePost };
}
