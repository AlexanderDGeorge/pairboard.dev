import { useState } from 'react';
import { PostSchema } from '../postSchema';
import { firestore } from '../../firebase';

export interface CreatePostFormData {
    created_by: PostSchema['created_by'];
    title: PostSchema['title'];
    description: PostSchema['description'];
    difficulty: PostSchema['difficulty'];
    host: PostSchema['host'];
    image_url: PostSchema['image_url'];
    language: PostSchema['language'];
    start_date: PostSchema['start_date'];
    type: PostSchema['type'];
}

export default function useCreatePost() {
    // check if subscribed or created any post during
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');
    const [error, setError] = useState<string | undefined>(undefined);

    async function createPost(newPost: CreatePostFormData) {
        setError(undefined);
        setStatus('loading');
        const postRef = firestore().collection('posts').doc();
        try {
            await postRef.set({
                id: postRef.id,
                created_at: new Date(),
                occupants: [],
                max_capacity: 3,
                subscribers: [],
                ...newPost,
                start_date: newPost.start_date,
            });
            setStatus('success');
        } catch (err) {
            console.error(err.message);
            setError(err.message);
            setStatus('error');
        }
    }

    return { status, error, createPost };
}
