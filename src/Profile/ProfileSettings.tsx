import React from "react";
import styled from "styled-components";
import DarkModeToggle from "./Components/DarkModeToggle";
import BioEdit from "./Components/BioEdit";

export default () => {
    return (
        <ProfileSettings>
            <DarkModeToggle />
            <BioEdit />
        </ProfileSettings>
    );
};

const ProfileSettings = styled.div`
    width: 100%;
    padding: 2% 5%;
    display: flex;
    flex-wrap: wrap;
    > * {
        max-height: 200px;
        width: 50%;
    }
`;
