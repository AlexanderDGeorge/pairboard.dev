import React from "react";
import styled from "styled-components";
import ProfileNav from "../Components/Profile/ProfileNav";
import ProfileHeader from "../Components/Profile/ProfileHeader";
import ProfileRouter from "../Components/Profile/ProfileRouter";

export default () => {
    return (
        <Profile>
            <ProfileNav />
            <ProfileHeader />
            <ProfileRouter />
        </Profile>
    );
};

const Profile = styled.div`
    min-height: 100%;
    height: 100%;
    width: 100%;
    background-color: ${(props) => props.theme.white};
`;
