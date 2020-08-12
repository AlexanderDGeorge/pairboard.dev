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
        updateUserDoc({
            company,
            username,
            bio,
            location,
        });
    }

    return (
        <ProfileSettings onChange={() => setChanges(true)}>
            <h1>Settings</h1>
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
