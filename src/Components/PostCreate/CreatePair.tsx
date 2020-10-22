import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styled from "styled-components";
import { StyledField } from "../../styled-components/formStyles";
import { DIFFICULTIES, LANGUAGES } from "../Post/constants";

export default () => {
    const minDate = new Date().toISOString().split("T")[0];
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
                <CreatePairboard>
                    <div>
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
                    </div>
                    <div>
                        <StyledField>
                            <label htmlFor="date">date</label>
                            <Field type="date" name="date" min={minDate} />
                            <ErrorMessage name="date" component="p" />
                        </StyledField>
                        <StyledField>
                            <label htmlFor="time">time</label>
                            <Field type="time" name="time" />
                            <ErrorMessage name="time" component="p" />
                        </StyledField>
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
