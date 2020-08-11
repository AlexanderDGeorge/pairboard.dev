import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "./Components/Dropdown";
import { createSearch } from "../firebase/search";

export default () => {
    const [open, setOpen] = useState(false);
    const [language, setLanguage] = useState("Any");
    const [difficulty, setDifficulty] = useState("Any");
    const [tag, setTag] = useState("Any");
    const [score, setScore] = useState(0);
    const [experience, setExperience] = useState("Any");

    const handleSearch = async () => {
        await createSearch({ language, difficulty, tag, score, experience });
    };

    return (
        <Search>
            <div>
                <Dropdown
                    label="Language"
                    setValue={setLanguage}
                    options={[
                        "Any",
                        "C",
                        "C++",
                        "C#",
                        "HTML/CSS",
                        "Java",
                        "JavaScript",
                        "Objective-C",
                        "PHP",
                        "Python",
                        "Ruby",
                        "SQL",
                        "Swift",
                        "TypeScript",
                        "Other",
                    ]}
                />
                <Dropdown
                    label="Difficulty"
                    setValue={setDifficulty}
                    options={["Any", "Easy", "Medium", "Hard"]}
                />
                <Dropdown
                    label="Tag"
                    setValue={setTag}
                    options={[
                        "Any",
                        "Arrays",
                        "Artificial Intelligence",
                        "Binary Search",
                        "Bit Manipulation",
                        "Data Structures",
                        "Dynamic Programming",
                        "Geometry",
                        "Graphs",
                        "Hash Table",
                        "Heaps",
                        "Interviews",
                        "Linked List",
                        "Machine Learning",
                        "Maps",
                        "Math",
                        "Pointers",
                        "Queues",
                        "Recursion",
                        "Stacks",
                        "Strings",
                        "Trees",
                        "Sorting",
                        "Other",
                    ]}
                />
                {open ? (
                    <>
                        <Dropdown
                            label="Score"
                            setValue={setScore}
                            options={[
                                0,
                                100,
                                200,
                                300,
                                400,
                                500,
                                600,
                                700,
                                800,
                                900,
                            ]}
                        />
                        <Dropdown
                            label="Experience"
                            setValue={setExperience}
                            options={[
                                "Any",
                                "Beginner",
                                "Student",
                                "Entry",
                                "Junior",
                                "Senior",
                            ]}
                        />
                    </>
                ) : null}
            </div>
            <button onClick={handleSearch}>Search</button>
            <p onClick={() => setOpen(!open)}>
                {open ? "Less Filters" : "More Filters"}
            </p>
        </Search>
    );
};

const Search = styled.div`
    position: relative;
    min-height: 140px;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.verylight};
    padding: 2% 5%;
    background-color: ${(props) => props.theme.white};
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 15px -8px ${(props) => props.theme.medium};
    > div {
        max-width: 80%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }
    > button {
        height: 60px;
        width: 120px;
        margin-top: 28px;
        font-size: 1em;
        font-weight: 600;
        background-color: ${(props) => props.theme.verydark};
        color: ${(props) => props.theme.verylight};
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: color 0.2s linear;
        &:hover {
            transition: color 0.2s linear;
            color: ${(props) => props.theme.white};
        }
    }
    > p {
        width: 120px;
        position: absolute;
        right: 5%;
        bottom: 10px;
        color: ${(props) => props.theme.accent};
        font-size: 0.8em;
        font-weight: 500;
        cursor: pointer;
        transition: color 0.2s linear;
        &:hover {
            transition: color 0.2s linear;
            color: ${(props) => props.theme.black};
        }
    }
`;
