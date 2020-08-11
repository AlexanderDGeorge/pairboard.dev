import React, { useState, useContext } from "react";
import styled from "styled-components";
import DarkModeToggle from "./Components/DarkModeToggle";
import BioEdit from "./Components/BioEdit";
import ExperienceSelect from "./Components/ExperienceSelect";
import ChangeUsername from "./Components/ChangeUsername";
import AddCompany from "./Components/AddCompany";
import { UserContext } from "../Application";
import { updateUserDoc } from "../firebase/user";
import AddLocation from "./Components/AddLocation";

export default () => {
    const currentUser = useContext(UserContext);
    const [changes, setChanges] = useState(false);
    const [company, setCompany] = useState(currentUser?.company || "");
    const [username, setUsername] = useState(currentUser?.username || "");
    const [location, setLocation] = useState(currentUser?.location || "");
    const [bio, setBio] = useState(currentUser?.bio || "");

    function handleUpdate() {
        setChanges(false);
        updateUserDoc({ company, username, bio, location });
    }

    return (
        <ProfileSettings onChange={() => setChanges(true)}>
            {changes ? (
                <button onClick={handleUpdate}>Save Changes</button>
            ) : null}
            <Column style={{ marginRight: 5 }}>
                <DarkModeToggle />
                <ExperienceSelect />
            </Column>
            <Column style={{ marginLeft: 5 }}>
                <BioEdit value={bio} setValue={setBio} />
                <ChangeUsername value={username} setValue={setUsername} />
                <AddCompany value={company} setValue={setCompany} />
                <AddLocation value={location} setValue={setLocation} />
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
    min-width: 300px;
    width: calc(50% - 5px);
    > * {
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
