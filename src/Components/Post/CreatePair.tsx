import React, { useContext, useRef } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styled from "styled-components";
import { StyledField } from "../../styled-components/formStyles";
import { DIFFICULTIES, LANGUAGES } from "./constants";
import useOnOutsideClick from "../../util/useOnOutsideClick";
import { ModalContext } from "../../Application";

export default () => {
    const modalRef = useRef(null);
    const { handleModal } = useContext(ModalContext)!;
    const now = new Date();
    useOnOutsideClick(modalRef, () => handleModal());

    async function validate(values: any) {
        const errors: { [key: string]: string } = {};

        // check if date is in the future
        return errors;
    }

    async function handleSubmit(values: any) {
        console.log(values);
    }

    return (
        <Formik
            initialValues={{
                title: "",
                description: "",
                difficulty: "",
                language: "",
                capacity: -1,
                private: false,
                password: "",
                sessionDate: "",
                sessionTime: "",
            }}
            onSubmit={handleSubmit}
            validate={validate}
        >
            {({ values, isValid, handleChange, handleBlur }) => (
                <CreatePairboard ref={modalRef}>
                    <h2>Create a Pairboard Post</h2>
                    <StyledField>
                        <label htmlFor="title">title</label>
                        <Field
                            type="text"
                            name="title"
                            placeholder="LeetCode Problems in JavaScript"
                        />
                        <ErrorMessage name="title" component="p" />
                    </StyledField>
                    <StyledField>
                        <label htmlFor="difficulty">difficulty</label>
                        <select
                            name="difficulty"
                            value={values.difficulty}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
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
                            value={values.language}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
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
                </CreatePairboard>
            )}
        </Formik>
    );
};

const CreatePairboard = styled(Form)`
    min-height: 400px;
    width: 300px;
    padding: 10px;
    background-color: ${(props) => props.theme.white};
    display: flex;
    flex-direction: column;
    > h2 {
        margin-bottom: 10px;
    }
`;
