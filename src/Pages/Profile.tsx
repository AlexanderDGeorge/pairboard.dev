import React from "react";
import styled from "styled-components";
import ProfileHeader from "../Profile/ProfileHeader";
import ProfileStats from "../Profile/ProfileStats";
import ProfileNav from "../Profile/ProfileNav";
import Nav from "../Nav/Nav";

export default () => {
    return (
        <Profile>
            <Nav />
            <ProfileNav />
            <ProfileHeader />
            <ProfileStats />
        </Profile>
    );
};

const Profile = styled.div`
    height: 100%;
    width: 100%;
`;
