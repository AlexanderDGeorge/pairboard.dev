import React, { useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { updateDarkModeSetting } from "../../firebase/user";
import { useUserContext } from "../../State/UserContext";

const moveHover = (value: string) => {
    if (value === "Light") {
        return {
            top: 58,
        };
    } else if (value === "Auto") {
        return {
            top: 100,
        };
    } else {
        return {
            top: 142,
        };
    }
};

export default () => {
    const currentUser = useUserContext();
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
            <h1>Dark Mode</h1>
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
    > h1 {
        margin-bottom: 20px;
        font-weight: 100;
    }
    > h3 {
        margin-bottom: 20px;
        font-weight: 100;
        cursor: pointer;
    }
    > div {
        height: 42px;
        width: 100%;
        position: absolute;
        background-color: ${(props) => props.theme.orange};
        opacity: 0.3;
    }
`;
