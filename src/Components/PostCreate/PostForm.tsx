import React, { useContext, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styled from "styled-components";
import { StyledButton, StyledField } from "../../styled-components/formStyles";
import { DIFFICULTIES, LANGUAGES } from "../Post/constants";
import LoadingBar from "../Animated/LoadingBar";
import { createPost } from "../../firebase/post";
import { ModalContext, UserContext } from "../../Application";
import { useHistory } from "react-router";

export default function PostForm() {
    const { uid, username, score, photoURL } = useContext(UserContext)!;
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { handleModal } = useContext(ModalContext)!;
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
            capacity,
            sessionDate,
            sessionStart,
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
            sessionStart
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
                sessionStart: "",
                sessionEnd: "",
            }}
            onSubmit={handleSubmit}
            validate={validate}
        >
            {({ values, isValid, handleChange, handleBlur }) => (
                <CreatePairboard>
                    <div>
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
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="">
                                        select a difficulty
                                    </option>
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
                                <ErrorMessage
                                    name="description"
                                    component="p"
                                />
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
                                <ErrorMessage
                                    name="sessionDate"
                                    component="p"
                                />
                            </StyledField>
                            <StyledField>
                                <label htmlFor="sessionStart">start</label>
                                <Field type="time" name="sessionStart" />
                                <ErrorMessage
                                    name="sessionStart"
                                    component="p"
                                />
                            </StyledField>
                            <StyledField>
                                <label htmlFor="sessionEnd">end</label>
                                <Field type="time" name="sessionEnd" />
                                <ErrorMessage name="sessionEnd" component="p" />
                            </StyledField>
                        </div>
                    </div>
                    <span>
                        <BackButton type="reset" onClick={() => handleModal()}>
                            Cancel
                        </BackButton>
                        <StyledButton
                            style={{ maxWidth: "80%" }}
                            disabled={!isValid || loading}
                            type="submit"
                        >
                            {loading ? <LoadingBar /> : "Create Post"}
                        </StyledButton>
                    </span>
                </CreatePairboard>
            )}
        </Formik>
    );
}

const CreatePairboard = styled(Form)`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    > div {
        display: flex;
        justify-content: space-between;
        @media screen and (max-width: 600px) {
            flex-direction: column;
        }
        > div {
            width: 45%;
            @media screen and (max-width: 600px) {
                width: 100%;
            }
        }
    }
    > span {
        display: flex;
        justify-content: space-between;
    }
`;

const BackButton = styled.button`
    width: 20%;
    border: 1px solid ${(props) => props.theme.accent};
    margin-right: 10px;
    transition: border 0.2s linear;
    &:hover {
        transition: border 0.2s linear;
        border: 1px solid ${(props) => props.theme.verydark};
    }
`;
