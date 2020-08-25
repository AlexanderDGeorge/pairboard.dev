import React from "react";
import styled from "styled-components";
import ProfileNav from "../Profile/ProfileNav";
import ProfileHeader from "../Profile/ProfileHeader";
import ProfileRouter from "../Profile/ProfileRouter";
import LinkBar from "../Nav/LinkBar";

export default () => {
    return (
        <Profile>
            <LinkBar />
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
