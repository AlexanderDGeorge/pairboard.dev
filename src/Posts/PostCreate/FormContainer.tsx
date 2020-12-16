import React, { useState, useContext } from 'react';
import PostForm from './PostForm';
import { ModalContext, CurrentDevContext } from '../../Application';
import { useHistory } from 'react-router';
import { createPost } from '../../firebase/post';

interface PostCreateValues {
    title: string;
    description: string;
    difficulty: string;
    language: string;
    capacity: number;
    start: Date;
}

export default function FormContainer(props: { type: string }) {
    const { user, username, name, image_url } = useContext(CurrentDevContext)!;
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { handleModal } = useContext(ModalContext)!;

    function validate(values: PostCreateValues) {
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

        if (!values.start) {
            errors.start = 'required';
        }
        return errors;
    }

    async function handleSubmit(values: any) {
        const { title, description, difficulty, language, start } = values;
        setLoading(true);
        // await createPost(
        //     { uid: user.uid, username, image_url },
        //     title,
        //     // @ts-ignore
        //     props.type,
        //     description,
        //     difficulty,
        //     language,
        //     start,
        // );
        history.replace('/');
        setLoading(false);
        handleModal();
    }

    return (
        <PostForm
            validate={validate}
            handleSubmit={handleSubmit}
            loading={loading}
        />
    );
}
