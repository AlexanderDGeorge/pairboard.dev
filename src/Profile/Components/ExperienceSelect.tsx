import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { UserContext } from "../../Application";
import { updateExperienceLevel } from "../../firebase/user";

const moveHover = (value: string) => {
    switch (value) {
        case "Student":
            return { top: 92 };
        case "Entry":
            return { top: 134 };
        case "Junior":
            return { top: 176 };
        case "Senior":
            return { top: 208 };
        default:
            return { top: 50 };
    }
};

export default () => {
    const currentUser = useContext(UserContext);
    const [experience, setExperience] = useState(
        currentUser?.experience || "Student"
    );
    const [hover, setHover] = useSpring(() => moveHover(experience));

    function Option(props: { value: string }) {
        const updateExperience = () => {
            setHover(moveHover(props.value));
            setExperience(props.value);
            updateExperienceLevel(props.value);
        };

        return <h3 onClick={updateExperience}>{props.value}</h3>;
    }

    return (
        <ExperienceSelect>
            <h2>Select Experience Level</h2>
            <Option value="Beginner" />
            <Option value="Student" />
            <Option value="Entry" />
            <Option value="Junior" />
            <Option value="Senior" />
            <animated.div style={hover} />
        </ExperienceSelect>
    );
};

const ExperienceSelect = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    > div {
        height: 42px;
        width: 100%;
        position: absolute;
        background-color: ${(props) => props.theme.blue};
        opacity: 0.3;
    }
`;
