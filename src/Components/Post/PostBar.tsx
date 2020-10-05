import React, { useContext, useState } from "react";
import styled from "styled-components";
import { LANGUAGES, DIFFICULTIES } from "./constants";
import { UserContext } from "../../Application";
import { createPost } from "../../firebase/post";
import { StyledButton, StyledField } from "../../styled-components/formStyles";
import { PostSchema } from "../../firebase/schema";

export default () => {
    const [language, setLanguage] = useState("");
    const [difficulty, setDifficulty] = useState<PostSchema["difficulty"]>(
        "easy"
    );
    const [description, setDescription] = useState("");
    const [maxCap, setMaxCap] = useState(2);
    const { uid, photoURL, score, username, postId } = useContext(UserContext)!;

    function handleClick() {
        if (!postId) {
            createPost(
                { uid, photoURL, score, username },
                description,
                difficulty,
                language,
                maxCap
            );
        }
    }

    return (
        <PostBar>
            <h2>Create a Post</h2>
            <StyledField>
                <label htmlFor="language">language</label>
                <select
                    name="language"
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    {LANGUAGES.map((language, i) => (
                        <option key={i} value={language}>
                            {language}
                        </option>
                    ))}
                </select>
            </StyledField>
            <StyledField>
                <label htmlFor="difficulty">difficulty</label>
                <select
                    name="difficulty"
                    // @ts-ignore
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    {DIFFICULTIES.map((difficulty, i) => (
                        <option key={i} value={difficulty}>
                            {difficulty}
                        </option>
                    ))}
                </select>
            </StyledField>
            <StyledField style={{ height: "auto" }}>
                <label htmlFor="description">description</label>
                <textarea
                    minLength={10}
                    required
                    style={{ minHeight: 200 }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                ></textarea>
            </StyledField>
            <StyledButton onClick={handleClick}>Post</StyledButton>
        </PostBar>
    );
};

const PostBar = styled.div`
    position: relative;
    height: 100%;
    min-width: 261px;
    border-right: 1px solid ${(props) => props.theme.verylight};
    padding-right: 10px;
    background-color: ${(props) => props.theme.white};
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 600px) {
        height: auto;
        width: 100%;
        border-right: 0;
        border-bottom: 1px solid ${(props) => props.theme.verylight};
        padding-right: 0;
        flex-direction: row;
        flex-wrap: wrap;
    }
    > h2 {
        margin-bottom: 10px;
    }
`;
