import React, { useState, useContext } from "react";
import styled from "styled-components";
import DarkModeToggle from "./Components/DarkModeToggle";
import BioEdit from "./Components/BioEdit";
import ExperienceSelect from "./Components/ExperienceSelect";
import ChangeUsername from "./Components/ChangeUsername";
import AddCompany from "./Components/AddCompany";
import { UserContext } from "../Application";
import { updateUserDoc } from "../firebase/user";

export default () => {
    const currentUser = useContext(UserContext);
    const [changes, setChanges] = useState(false);
    const [company, setCompany] = useState(currentUser?.company || "");
    const [username, setUsername] = useState(currentUser?.username || "");
    const [bio, setBio] = useState(currentUser?.bio || "");

    function handleUpdate() {
        setChanges(false);
        updateUserDoc({ company, username, bio });
    }

    return (
        <ProfileSettings onChange={() => setChanges(true)}>
            {changes ? (
                <button onClick={handleUpdate}>Save Changes</button>
            ) : null}
            <Column>
                <DarkModeToggle />
                <ExperienceSelect />
            </Column>
            <Column>
                <BioEdit value={bio} setValue={setBio} />
                <ChangeUsername value={username} setValue={setUsername} />
                <AddCompany value={company} setValue={setCompany} />
            </Column>
            {changes ? (
                <button onClick={handleUpdate}>Save Changes</button>
            ) : null}
        </ProfileSettings>
    );
};

const ProfileSettings = styled.form`
    width: 100%;
    padding: 2% 5%;
    display: flex;
    flex-wrap: wrap;
    > button {
        width: 100%;
        background-color: ${(props) => props.theme.dark};
        color: ${(props) => props.theme.verylight};
        font-size: 1.2em;
        padding: 2%;
        margin: 2% 0;
        &:hover {
            background-color: ${(props) => props.theme.black};
            color: ${(props) => props.theme.white};
        }
    }
`;

const Column = styled.div`
    min-width: 300px;
    width: 50%;
    > * {
        margin-bottom: 2%;
        > h1 {
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
