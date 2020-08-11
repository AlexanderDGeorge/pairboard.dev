import React from "react";
import styled from "styled-components";
import Nav from "../Nav/Nav";
import ProfileNav from "../Profile/ProfileNav";
import ProfileHeader from "../Profile/ProfileHeader";
import ProfileRouter from "../Profile/ProfileRouter";

export default () => {
    return (
        <Profile>
            <Nav />
            <ProfileNav />
            <ProfileHeader />
            <ProfileRouter />
        </Profile>
    );
};

const Profile = styled.div`
    height: 100%;
    width: 100%;
`;
