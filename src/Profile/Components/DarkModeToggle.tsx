import React, { useState } from "react";
import styled from "styled-components";
// import { useSpring, animated } from "react-spring";
import { updateDarkModeSetting } from "../../firebase/user";
import { useUserContext } from "../../State/UserContext";

export default () => {
    const currentUser = useUserContext();
    const [darkMode, setDarkMode] = useState(currentUser?.darkMode || "auto");

    return (
        <DarkModeToggle onClick={() => updateDarkModeSetting(darkMode)}>
            <h1>Dark Mode</h1>
            <h3 onClick={() => setDarkMode("light")}>Light</h3>
            <h3 onClick={() => setDarkMode("auto")}>Auto</h3>
            <h3 onClick={() => setDarkMode("dark")}>Dark</h3>
        </DarkModeToggle>
    );
};

const DarkModeToggle = styled.div`
    display: flex;
    flex-direction: column;
    > h1,
    h3 {
        margin-bottom: 20px;
        font-weight: 100;
        cursor: pointer;
    }
`;
