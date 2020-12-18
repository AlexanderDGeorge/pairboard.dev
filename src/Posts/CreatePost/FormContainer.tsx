import React, { useContext } from 'react';
import PostForm from './PostForm';
import { ModalContext, CurrentDevContext } from '../../Application';
import useCreatePost, { CreatePostFormData } from '../util/useCreatePost';
import { PostSchema } from '../postSchema';

export default function FormContainer(props: { type: PostSchema['type'] }) {
    const { profile } = useContext(CurrentDevContext)!;
    const { status, error, createPost } = useCreatePost();
    const { handleModal } = useContext(ModalContext)!;

    function validate(values: CreatePostFormData) {
        const errors: { [key: string]: string } = {};
        if (!values.title) {
            errors.title = 'required';
        } else if (values.title.length < 4) {
            errors.title = 'title not long enough';
        }

        if (!values.description) {
            errors.description = 'required';
        } else if (values.description.length < 10) {
            errors.description = 'please write a longer description';
        }

        if (!values.difficulty) {
            errors.difficulty = 'required';
        }

        if (!values.language) {
            errors.language = 'required';
        }

        if (!values.start_date) {
            errors.start_date = 'required';
        }
        return errors;
    }

    async function handleSubmit(values: CreatePostFormData) {
        console.log(values);
        await createPost({ ...values, created_by: profile, type: props.type });
        handleModal();
    }

    return (
        <PostForm
            validate={validate}
            handleSubmit={handleSubmit}
            status={status}
        />
    );
}
