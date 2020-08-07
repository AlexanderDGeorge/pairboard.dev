import React from "react";
import styled from "styled-components";
import { updateDarkModeSetting } from "../firebase/user";
import { useUserContext } from "../State/UserContext";

export default () => {
    const currentUser = useUserContext();

    return (
        <>
            <H4>Dark Mode</H4>
            <DarkModeSelect>
                <DarkModeOption
                    style={
                        currentUser?.darkMode === "light"
                            ? { color: "black" }
                            : {}
                    }
                    onClick={() => updateDarkModeSetting("light")}
                >
                    light
                </DarkModeOption>
                <div className="div"></div>
                <DarkModeOption
                    style={
                        currentUser?.darkMode === "auto"
                            ? { color: "black" }
                            : {}
                    }
                    onClick={() => updateDarkModeSetting("auto")}
                >
                    auto
                </DarkModeOption>
                <div className="div"></div>
                <DarkModeOption
                    style={
                        currentUser?.darkMode === "dark"
                            ? { color: "black" }
                            : {}
                    }
                    onClick={() => updateDarkModeSetting("dark")}
                >
                    dark
                </DarkModeOption>
            </DarkModeSelect>
        </>
    );
};

const H4 = styled.h4`
    color: ${(props) => props.theme.verydark};
    margin-bottom: 10px;
`;

const DarkModeSelect = styled.div`
    height: 35px;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 10px;
    background-color: ${(props) => props.theme.light};
    display: flex;
    align-items: center;
    justify-content: space-between;
    > .div {
        height: 100%;
        width: 0;
        border-left: 1px solid ${(props) => props.theme.verydark};
    }
`;

const DarkModeOption = styled.div`
    height: 30px;
    width: 45px;
    border-radius: 10px;
    color: ${(props) => props.theme.dark};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
        color: ${(props) => props.theme.black};
    }
`;
