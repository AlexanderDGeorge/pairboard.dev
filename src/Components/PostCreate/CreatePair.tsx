import React, { useContext, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styled from "styled-components";
import { StyledButton, StyledField } from "../../styled-components/formStyles";
import { DIFFICULTIES, LANGUAGES } from "../Post/constants";
import LoadingBar from "../Animated/LoadingBar";
import { createPost } from "../../firebase/post";
import { UserContext } from "../../Application";
import { useHistory } from "react-router";

export default () => {
    const { uid, username, score, photoURL } = useContext(UserContext)!;
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const minDate = new Date().toISOString().split("T")[0];
    async function validate(values: any) {
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
        if (!values.sessionTime) {
            errors.sessionTime = "required";
        }
        // check if date is in the future
        return errors;
    }

    async function handleSubmit(values: any) {
        const {
            title,
            description,
            difficulty,
            language,
            capacity,
            sessionDate,
            sessionTime,
        } = values;
        setLoading(true);
        console.log(values);
        await createPost(
            { uid, username, score, photoURL },
            title,
            description,
            difficulty,
            language,
            capacity,
            sessionDate,
            sessionTime
        );
        history.replace("/");
        setLoading(false);
    }

    return (
        <Formik
            initialValues={{
                title: "",
                description: "",
                difficulty: "",
                language: "",
                capacity: 100,
                private: false,
                password: "",
                sessionDate: "",
                sessionTime: "",
            }}
            onSubmit={handleSubmit}
            validate={validate}
        >
            {({ values, isValid, handleChange, handleBlur }) => (
                <CreatePairboard>
                    <div>
                        <StyledField>
                            <label htmlFor="title">title</label>
                            <Field
                                type="text"
                                name="title"
                                placeholder="LeetCode Problems in JavaScript"
                                autoFocus
                            />
                            <ErrorMessage name="title" component="p" />
                        </StyledField>
                        <StyledField>
                            <label htmlFor="difficulty">difficulty</label>
                            <select
                                name="difficulty"
                                // value={values.difficulty}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="">select a difficulty</option>
                                {DIFFICULTIES.map((difficulty, i) => (
                                    <option key={i} value={difficulty}>
                                        {difficulty}
                                    </option>
                                ))}
                            </select>
                            <ErrorMessage name="difficulty" component="p" />
                        </StyledField>
                        <StyledField>
                            <label htmlFor="language">language</label>
                            <select
                                name="language"
                                // value={values.language}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="">select a language</option>
                                {LANGUAGES.map((language, i) => (
                                    <option key={i} value={language}>
                                        {language}
                                    </option>
                                ))}
                            </select>
                            <ErrorMessage name="difficulty" component="p" />
                        </StyledField>
                        <StyledField>
                            <label htmlFor="description">description</label>
                            <textarea
                                style={{ minHeight: 100 }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="description"
                                placeholder="What do you want to accomplish?"
                            ></textarea>
                            <ErrorMessage name="description" component="p" />
                        </StyledField>
                    </div>
                    <div>
                        <StyledField>
                            <label htmlFor="sessionDate">date</label>
                            <Field
                                type="date"
                                name="sessionDate"
                                min={minDate}
                            />
                            <ErrorMessage name="sessionDate" component="p" />
                        </StyledField>
                        <StyledField>
                            <label htmlFor="sessionTime">time</label>
                            <Field type="time" name="sessionTime" />
                            <ErrorMessage name="sessionTime" component="p" />
                        </StyledField>
                        <StyledButton
                            disabled={!isValid || loading}
                            type="submit"
                        >
                            {loading ? <LoadingBar /> : "Create Post"}
                        </StyledButton>
                    </div>
                </CreatePairboard>
            )}
        </Formik>
    );
};

const CreatePairboard = styled(Form)`
    min-height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 600px) {
        flex-direction: column;
    }
    > div {
        width: 45%;
        /* margin-bottom: 10px; */
        @media screen and (max-width: 600px) {
            width: 100%;
        }
    }
`;
