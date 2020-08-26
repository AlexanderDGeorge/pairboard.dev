import React, { useState, useContext } from "react";
import styled from "styled-components";
import DarkModeToggle from "./Components/DarkModeToggle";
import { UserContext } from "../Application";
import { updateUserDoc } from "../firebase/user";
import InputField from "./Components/InputField";

export default () => {
    const { username, bio } = useContext(UserContext)!;
    const [changes, setChanges] = useState(false);
    const [profileInfo, setProfileInfo] = useState({
        username,
        bio,
    });

    function handleUpdate() {
        // [TODO]: handle empty username
        setChanges(false);
        updateUserDoc(profileInfo);
    }

    return (
        <ProfileSettings onChange={() => setChanges(true)}>
            <h1>Settings</h1>
            {changes ? (
                <button onClick={handleUpdate}>Save Changes</button>
            ) : null}
            <Column style={{ marginRight: 5 }}>
                <DarkModeToggle />
            </Column>
            <Column style={{ marginLeft: 5 }}>
                <InputField
                    label="bio"
                    profileInfo={profileInfo}
                    setProfileInfo={setProfileInfo}
                />
                <InputField
                    label="username"
                    profileInfo={profileInfo}
                    setProfileInfo={setProfileInfo}
                />
            </Column>
        </ProfileSettings>
    );
};

const ProfileSettings = styled.form`
    position: relative;
    width: 100%;
    padding: 2% 5%;
    display: flex;
    flex-wrap: wrap;
    > h1 {
        width: 100%;
        padding: 2%;
        border-bottom: 1px solid ${(props) => props.theme.accent};
        margin-bottom: 5%;
        text-align: center;
    }
    > button {
        z-index: 1;
        position: absolute;
        top: -80px;
        left: 0;
        width: 100%;
        background-color: ${(props) => props.theme.dark};
        color: ${(props) => props.theme.verylight};
        font-size: 1.2em;
        padding: 2%;
        margin: 2% 0;
        cursor: pointer;
        transition: all 0.5s ease-out;
        &:hover {
            transition: all 0.5s ease-in;
            background-color: ${(props) => props.theme.black};
            color: ${(props) => props.theme.white};
        }
    }
`;

const Column = styled.div`
    @media screen and (max-width: 500px) {
        width: 100%;
    }
    @media screen and (min-width: 501px) {
        width: calc(50% - 5px);
    }
    > * {
        width: 100%;
        margin-bottom: 2%;
        > h2 {
            margin-bottom: 20px;
            font-weight: 100;
        }
        > h3 {
            background-color: transparent;
            margin-bottom: 20px;
            font-weight: 100;
            cursor: pointer;
        }
    }
`;
