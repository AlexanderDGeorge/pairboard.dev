import React, { useState, useContext } from "react";
import PostForm from "./PostForm";
import { ModalContext, UserContext } from "../../Application";
import { useHistory } from "react-router";
import { createPost } from "../../firebase/post";

export default function FormContainer(props: { type: string }) {
    const { uid, username, score, photoURL } = useContext(UserContext)!;
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { handleModal } = useContext(ModalContext)!;

    const capacity = () => {
        switch (props.type) {
            case "Pairboard":
                return 2;
            case "Team":
                return 20;
            case "Lecture":
                return 1000;
            default:
                return 1000;
        }
    };

    function validate(values: any) {
        const errors: { [key: string]: string } = {};
        if (!values.title) {
            errors.title = "required";
        } else if (values.title.length < 4) {
            errors.title = "title not long enough";
        }

        if (!values.description) {
            errors.description = "required";
        } else if (values.description.length < 10) {
            errors.description = "please write a longer description";
        }

        if (!values.difficulty) {
            errors.difficulty = "required";
        }

        if (!values.language) {
            errors.language = "required";
        }

        if (!values.sessionDate) {
            errors.sessionDate = "required";
        }
        if (!values.sessionStart) {
            errors.sessionStart = "required";
        }
        if (!values.sessionEnd) {
            errors.sessionEnd = "required";
        }
        return errors;
    }

    async function handleSubmit(values: any) {
        const {
            title,
            description,
            difficulty,
            language,
            sessionDate,
            sessionStart,
            sessionEnd,
        } = values;
        setLoading(true);
        console.log(values);
        await createPost(
            { uid, username, score, photoURL },
            title,
            // @ts-ignore
            props.type,
            description,
            difficulty,
            language,
            capacity(),
            sessionDate,
            sessionStart,
            sessionEnd
        );
        history.replace("/");
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
