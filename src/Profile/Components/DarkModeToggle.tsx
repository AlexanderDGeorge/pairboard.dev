import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { updateDarkModeSetting } from "../../firebase/user";
import { UserContext } from "../../Application";

const moveHover = (value: string) => {
    if (value === "Light") {
        return {
            top: 50,
        };
    } else if (value === "Auto") {
        return {
            top: 92,
        };
    } else {
        return {
            top: 134,
        };
    }
};

export default () => {
    const currentUser = useContext(UserContext);
    const [darkMode, setDarkMode] = useState(currentUser?.darkMode || "Auto");
    const [hover, setHover] = useSpring(() => moveHover(darkMode));

    function Option(props: { value: string }) {
        const updateDarkMode = () => {
            setHover(moveHover(props.value));
            setDarkMode(props.value);
            updateDarkModeSetting(props.value);
        };

        return <h3 onClick={updateDarkMode}>{props.value}</h3>;
    }

    return (
        <DarkModeToggle>
            <h2>Dark Mode</h2>
            <Option value="Light" />
            <Option value="Auto" />
            <Option value="Dark" />
            <animated.div style={hover} />
        </DarkModeToggle>
    );
};

const DarkModeToggle = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    > div {
        height: 42px;
        width: 100%;
        position: absolute;
        background-color: ${(props) => props.theme.green};
        opacity: 0.3;
    }
`;
